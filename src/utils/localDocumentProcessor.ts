import mammoth from "mammoth";

export interface ProcessedDocument {
    content: string;
    type: "base64" | "text";
    mimeType: string;
}

/**
 * Processes a file for AI analysis entirely client-side.
 * - PDFs/Images: Converted to Base64 for Vision API.
 * - TXT: Read as raw text.
 * - DOCX: Text extracted using mammoth.
 */
export const processDocument = async (file: File): Promise<ProcessedDocument> => {
    const mimeType = file.type;

    // Handle PDF and Images (Vision API compatible)
    if (mimeType === "application/pdf" || mimeType.startsWith("image/")) {
        const base64 = await fileToBase64(file);
        return {
            content: base64,
            type: "base64",
            mimeType,
        };
    }

    // Handle Text Files
    if (mimeType === "text/plain") {
        const text = await readFileAsText(file);
        return {
            content: text,
            type: "text",
            mimeType,
        };
    }

    // Handle Word Documents (.docx)
    if (
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
    ) {
        const arrayBuffer = await fileToArrayBuffer(file);
        const result = await mammoth.extractRawText({ arrayBuffer });
        return {
            content: result.value, // The raw text
            type: "text",
            mimeType,
        };
    }

    throw new Error(`Unsupported file type: ${mimeType}. Please upload PDF, DOCX, TXT, or Image.`);
};

// Helper: File to Base64 (stripped prefix)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = (error) => reject(error);
    });
};

// Helper: File to Text
const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

// Helper: File to ArrayBuffer (for mammoth)
const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = (error) => reject(error);
    });
};
