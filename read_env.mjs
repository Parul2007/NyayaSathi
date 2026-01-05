import fs from 'fs';
import path from 'path';

try {
    const envPath = path.resolve('.env');
    const envContent = fs.readFileSync(envPath, { encoding: 'utf8' }).toString();
    // If utf8 fails, it might be utf16le, but Node might handle BOM. 
    // Let's try to just find the line.

    const match = envContent.match(/VITE_FIREBASE_STORAGE_BUCKET=(.*)/);
    if (match) {
        console.log("BUCKET_NAME:" + match[1].trim());
    } else {
        // Try reading as utf16le if the above failed to return anything meaningful or if file looks binary
        const buffer = fs.readFileSync(envPath);
        const text = buffer.toString('utf16le'); // Guessing
        const match2 = text.match(/VITE_FIREBASE_STORAGE_BUCKET=(.*)/);
        if (match2) {
            console.log("BUCKET_NAME:" + match2[1].trim());
        } else {
            console.log("BUCKET_NAME_NOT_FOUND");
        }
    }
} catch (e) {
    console.error(e);
}
