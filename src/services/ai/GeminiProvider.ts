import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIService, AIMessage, DocumentAnalysisResult } from './types';

export class GeminiProvider implements IAIService {
    private genAI: GoogleGenerativeAI | null = null;
    private currentApiKey: string | null = null;

    /**
     * Initialize or get the Gemini client
     */
    private getClient(apiKey: string): GoogleGenerativeAI {
        if (!apiKey || apiKey.trim() === '') {
            throw new Error("API Key is required. Please add your Gemini API Key in settings.");
        }

        // Re-initialize if key changed
        if (!this.genAI || this.currentApiKey !== apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey.trim());
            this.currentApiKey = apiKey.trim();
        }

        return this.genAI;
    }

    /**
     * Try to get a working model, trying multiple model names
     */
    private async getWorkingModel(client: GoogleGenerativeAI, modelNames: string[]) {
        let lastError: any = null;

        for (const modelName of modelNames) {
            try {
                console.log(`[Gemini] Attempting model: ${modelName}`);
                const model = client.getGenerativeModel({ model: modelName });

                // Test if model works by trying a simple generation (with timeout)
                // Actually, just return it - the real test happens when we use it
                return model;
            } catch (error: any) {
                console.warn(`[Gemini] Model ${modelName} initialization failed:`, error.message);
                lastError = error;
                continue;
            }
        }

        throw lastError || new Error("No working model found");
    }

    /**
     * Send a message to the AI
     */
    async sendMessage(history: AIMessage[], message: string, apiKey?: string): Promise<string> {
        if (!apiKey || apiKey.trim() === '') {
            throw new Error("API Key is required. Please configure your Gemini API key.");
        }

        const client = this.getClient(apiKey);

        // Try multiple model names in order of preference
        const modelsToTry = [
            'gemini-2.0-flash',
            'gemini-2.0-flash-lite',
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'gemini-pro'
        ];

        // Convert history to Gemini format
        const geminiHistory = history
            .filter(msg => msg.text && msg.text.trim().length > 0)
            .map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text.trim() }]
            }));

        // Ensure history starts with user message
        while (geminiHistory.length > 0 && geminiHistory[0].role !== 'user') {
            geminiHistory.shift();
        }

        let lastError: any = null;

        // Try each model until one works
        for (const modelName of modelsToTry) {
            try {
                console.log(`[Gemini] Trying to send message with model: ${modelName}`);

                const model = client.getGenerativeModel({ model: modelName }, { apiVersion: 'v1' });

                // Start chat session
                const chat = model.startChat({
                    history: geminiHistory.length > 0 ? geminiHistory : undefined,
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.95,
                        topK: 40,
                        maxOutputTokens: 2048,
                    },
                });

                // Send message and get response
                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();

                console.log(`[Gemini] Successfully got response from ${modelName}`);
                return text;

            } catch (error: any) {
                console.error(`[Gemini] Model ${modelName} failed:`, error);
                lastError = error;

                // Check error type
                const errorMessage = String(error.message || error.toString() || '').toLowerCase();
                const statusCode = error.response?.status || error.status || error.statusCode;

                // If it's an API key error, stop trying other models
                if (errorMessage.includes('api key') ||
                    errorMessage.includes('401') ||
                    errorMessage.includes('unauthorized') ||
                    statusCode === 401) {
                    console.error('[Gemini] API key error detected, stopping attempts');
                    break;
                }

                // If it's a model not found error, try next model
                if (errorMessage.includes('404') ||
                    errorMessage.includes('not found') ||
                    statusCode === 404) {
                    console.log(`[Gemini] Model ${modelName} not found, trying next...`);
                    continue;
                }

                // For other errors, also try next model (might be model-specific)
                if (errorMessage.includes('model') || errorMessage.includes('invalid')) {
                    console.log(`[Gemini] Model error with ${modelName}, trying next...`);
                    continue;
                }

                // For network or quota errors, don't try other models
                if (errorMessage.includes('429') ||
                    errorMessage.includes('quota') ||
                    errorMessage.includes('network') ||
                    errorMessage.includes('fetch')) {
                    break;
                }

                // Try next model for other errors too
                continue;
            }
        }

        // All models failed
        throw this.mapError(lastError || new Error("Failed to get response from AI service"));
    }

    /**
     * Analyze a document using vision model
     */
    async analyzeDocument(input: { content: string, type: 'base64' | 'text', mimeType: string }, apiKey?: string): Promise<DocumentAnalysisResult> {
        if (!apiKey || apiKey.trim() === '') {
            return {
                isLegalDocument: false,
                errorMessage: "API Key is required. Please configure your Gemini API key."
            };
        }

        const client = this.getClient(apiKey);

        // Try multiple models
        // Try multiple models
        const modelsToTry = [
            'gemini-2.5-flash', // User requested priority
            'gemini-2.5-pro',
            'gemini-2.0-flash-exp',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'gemini-2.0-flash',
            'gemini-pro'
        ];

        // Filter models based on input type (Vision models only for images/pdfs)
        // Actually, gemini-pro (1.0) is text-only. The others are multimodal.
        // We'll trust the loop to handle errors if a model doesn't support images.

        const basePrompt = `You are an expert AI Legal Assistant named 'Sahayak'. 
        
        YOUR OBJECTIVE:
        Analyze the provided document (or text) and explain it in extremely SIMPLE, PLAIN ENGLISH that a non-lawyer can understand.
        The user wants a DETAILED breakdown, not just a summary. 
        
        INSTRUCTIONS:
        1. ACCEPT any document type (handwritten, formal, chat, receipt). Treat all as valid.
        2. EXPLAIN the content in "Layman's Terms". Avoid legal jargon where possible, or explain it if necessary.
        3. PROVIDE concrete, actionable advice in the "Actions" section.
        4. BE COMPREHENSIVE. Don't leave out important details. By "Detailed", we mean covering all clauses, penalties, dates, and obligations found.
        
        OUTPUT FORMAT (Strict JSON):
        {
            "isLegalDocument": boolean,
            "documentType": "string (e.g., Rental Agreement, Court Order, Invoice)",
            "summary": "string (A comprehensive, easy-to-read summary of the ENTIRE document. Use simple language.)",
            "keyPoints": [
                "Point 1: Explain what this means simply.",
                "Point 2...",
                ...
            ],
            "risks": [
                "Risk 1: What could go wrong? (e.g., 'You might lose your deposit if...')",
                ...
            ],
            "actions": [
                "Step 1: What should the user do next? (e.g., 'Sign page 3 but ask for X change first')",
                ...
            ],
            "parties": ["Name 1", "Name 2"],
            "dates": ["Date 1", "Date 2"]
        }
        
        CRITICAL: 
        - If the document is barely readable or random, set isLegalDocument: false.
        - Otherwise, always return isLegalDocument: true.
        - Return ONLY valid JSON. No Markdown.`;

        let lastError: any = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`[Gemini] Analyzing document with model: ${modelName}`);

                const model = client.getGenerativeModel({ model: modelName }, { apiVersion: 'v1' });

                let result;

                if (input.type === 'base64') {
                    result = await model.generateContent([
                        {
                            inlineData: {
                                mimeType: input.mimeType,
                                data: input.content
                            }
                        },
                        { text: basePrompt }
                    ]);
                } else {
                    // Text Input
                    const fullPrompt = `${basePrompt}\n\nDOCUMENT CONTENT:\n${input.content}`;
                    result = await model.generateContent(fullPrompt);
                }

                const response = await result.response;
                let text = response.text();
                console.log("[Gemini] Raw AI Response:", text); // Debug log

                // Clean markdown code blocks if present
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();

                // Try to extract JSON from the response
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    text = jsonMatch[0];
                }

                try {
                    const parsed = JSON.parse(text) as DocumentAnalysisResult;
                    console.log(`[Gemini] Successfully analyzed document with ${modelName}`);
                    return parsed;
                } catch (parseError) {
                    console.error('[Gemini] JSON parse error:', parseError);
                    // FALLBACK: Return success even if JSON fails
                    return {
                        isLegalDocument: true,
                        documentType: "Analyzed Document",
                        summary: text.substring(0, 500) + "...",
                        keyPoints: ["Detailed analysis in summary"],
                        risks: ["Automatic formatting failed, please read summary"],
                        actions: ["Consult a lawyer for full verification"],
                        parties: [],
                        dates: []
                    };
                }

            } catch (error: any) {
                console.error(`[Gemini] Model ${modelName} failed for document analysis:`, error);
                lastError = error;

                // Try next model 
                continue;
            }
        }

        // All models failed
        return {
            isLegalDocument: false,
            errorMessage: this.mapError(lastError || new Error("Failed to analyze document")).message
        };
    }

    /**
     * Map API errors to user-friendly messages
     */
    private mapError(error: any): Error {
        const errorMsg = String(error?.message || error?.toString() || '').toLowerCase();
        const statusCode = error?.response?.status || error?.status || error?.statusCode || '';

        // API Key errors
        if (errorMsg.includes('api key') ||
            errorMsg.includes('401') ||
            errorMsg.includes('unauthorized') ||
            errorMsg.includes('authentication') ||
            statusCode === 401) {
            return new Error("Invalid API Key. Please check your Gemini API key is correct. Get one from https://makersuite.google.com/app/apikey");
        }

        // Model not found
        if (errorMsg.includes('404') ||
            errorMsg.includes('not found') ||
            errorMsg.includes('model not found') ||
            statusCode === 404) {
            return new Error("Model not available. Your API key may not have access. Please verify at https://makersuite.google.com/app/apikey");
        }

        // Invalid model
        if (errorMsg.includes('invalid model') ||
            errorMsg.includes('model name') ||
            errorMsg.includes('not supported')) {
            return new Error("Invalid model configuration. Trying alternative models...");
        }

        // Rate limiting
        if (errorMsg.includes('429') ||
            errorMsg.includes('quota') ||
            errorMsg.includes('rate limit') ||
            statusCode === 429) {
            return new Error("API quota exceeded or rate limited. Please try again later or check your quota.");
        }

        // Network errors
        if (errorMsg.includes('fetch') ||
            errorMsg.includes('network') ||
            errorMsg.includes('failed to fetch') ||
            errorMsg.includes('networkerror')) {
            return new Error("Network error. Please check your internet connection.");
        }

        // Permission errors
        if (errorMsg.includes('403') ||
            errorMsg.includes('forbidden') ||
            errorMsg.includes('permission') ||
            statusCode === 403) {
            return new Error("API access denied. Please check your API key permissions.");
        }

        // Safety filter
        if (errorMsg.includes('blocked') ||
            errorMsg.includes('safety') ||
            errorMsg.includes('policy')) {
            return new Error("Content was blocked by safety filters. Please rephrase your question.");
        }

        // Return original error if meaningful
        const originalMsg = error?.message || error?.toString() || '';
        if (originalMsg && originalMsg.length > 0 && originalMsg.length < 200) {
            return new Error(originalMsg);
        }

        return new Error("An unexpected error occurred. Please verify your API key and try again.");
    }
}
