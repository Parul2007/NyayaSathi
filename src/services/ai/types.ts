
export interface AIMessage {
    role: 'user' | 'model';
    text: string;
}

export interface AIConfig {
    apiKey?: string;
    chatModel: string;
    visionModel: string;
}

export interface DocumentAnalysisResult {
    isLegalDocument: boolean;
    documentType?: string;
    summary?: string;
    keyPoints?: string[];
    risks?: string[];
    actions?: string[];
    parties?: string[];
    dates?: string[];
    errorMessage?: string;
}

export interface IAIService {
    /**
     * Sends a message to the AI chat model.
     * @param history Previous chat history
     * @param message User's new message
     * @param apiKey (Optional) Override API key (e.g., from user profile)
     */
    sendMessage(history: AIMessage[], message: string, apiKey?: string): Promise<string>;

    /**
     * Analyzes a document using the AI vision model or text model.
     * @param input Object containing content, type ('base64' | 'text'), and mimeType
     * @param apiKey (Optional) Override API key
     */
    analyzeDocument(input: { content: string, type: 'base64' | 'text', mimeType: string }, apiKey?: string): Promise<DocumentAnalysisResult>;
}
