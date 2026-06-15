import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Default config for AI Studio Preview
import aiStudioConfig from "../../firebase-applet-config.json";

// Helper to sanitize env variables if user copy-pasted with trailing commas or quotes
const sanitize = (val?: string) => {
  if (!val) return val;
  return val.replace(/,$/, '').replace(/^["']/, '').replace(/["']$/, '').trim();
};

// For Vercel deployment, you can use environment variables:
const isCustomFirebase = !!import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = isCustomFirebase 
  ? {
      apiKey: sanitize(import.meta.env.VITE_FIREBASE_API_KEY),
      authDomain: sanitize(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
      projectId: sanitize(import.meta.env.VITE_FIREBASE_PROJECT_ID),
      storageBucket: sanitize(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
      messagingSenderId: sanitize(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      appId: sanitize(import.meta.env.VITE_FIREBASE_APP_ID)
    }
  : aiStudioConfig;

if (isCustomFirebase) {
  console.log(`🔥 Connected to Custom Firebase Project: ${firebaseConfig.projectId}`);
} else {
  console.log(`🔥 Connected to AI Studio Internal Database: ${aiStudioConfig.firestoreDatabaseId}`);
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, isCustomFirebase ? undefined : aiStudioConfig.firestoreDatabaseId);

// Enable offline persistence to speed up initial loads
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
    } else if (err.code == 'unimplemented') {
      console.warn("The current browser does not support all of the features required to enable persistence");
    }
  });
} catch (e) {
  console.warn("Persistence setup error:", e);
}

export const auth = getAuth(app);
export let storage: any = null;
try {
  storage = getStorage(app);
} catch (e) {
  console.warn("Storage could not be initialized:", e);
}

// Simple connection tester
export async function testConnection() {
  const { doc, getDocFromServer } = await import("firebase/firestore");
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase connected successfully");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
