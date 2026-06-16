import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA3jlU7WJaTKc1cOn7KOjD5J_9xDCkDGfM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "islamabadtechnician-e8a44.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "islamabadtechnician-e8a44",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "islamabadtechnician-e8a44.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "169024688662",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:169024688662:web:4fdce0530ca5001f919b37"
};

console.log(`🔥 Connected to Custom Firebase Project: ${firebaseConfig.projectId}`);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
