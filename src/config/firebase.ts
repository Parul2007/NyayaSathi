import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

console.log("Firebase Config: import.meta.env keys:", Object.keys(import.meta.env));
requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName]) {
    console.error(`Missing var: ${varName}`);
    throw new Error(`CRITICAL FIREBASE ERROR: Missing environment variable ${varName}.`);
  }
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Avoid re‑initialising in hot-reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
// Initialize Storage instance - MUST be used with Firebase SDK functions (ref, uploadBytes, etc.)
// DO NOT use direct REST API calls or manual fetches.
export const storage = getStorage(app);


