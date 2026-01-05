import { AIConfig } from './types';

export const AI_DEFAULTS = {
    chatModel: 'gemini-2.5-flash',
    visionModel: 'gemini-2.5-flash',
};

export const getAIConfig = (): AIConfig => {
    return {
        // API key should come from user profile or environment variable
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || undefined,
        chatModel: import.meta.env.VITE_AI_MODEL_CHAT || AI_DEFAULTS.chatModel,
        visionModel: import.meta.env.VITE_AI_MODEL_VISION || AI_DEFAULTS.visionModel
    };
};
