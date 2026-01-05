// Firebase Storage is disabled for this project version.
// All documents are processed client-side.

export const uploadFile = async (path: string, file: File) => {
    throw new Error("Firebase Storage is disabled. Use client-side processing.");
};

export const getFileUrl = async (path: string) => {
    throw new Error("Firebase Storage is disabled.");
};

export const openDocument = async (path: string) => {
    console.warn("Document opening from storage is disabled.");
    // No-op or throw
    throw new Error("Storage access is disabled.");
};
