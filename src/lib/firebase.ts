import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfigTemp from '../../firebase-applet-config.json';

const sanitize = (val: string | undefined | boolean) => {
  if (!val || typeof val !== 'string') return val as string;
  return val.replace(/,$/, '').replace(/^["']/, '').replace(/["']$/, '').trim();
};

const firebaseConfig = {
  ...firebaseConfigTemp,
  // Add standard firebase fallbacks if missing
  authDomain: firebaseConfigTemp.authDomain || "islamabadtechnician-e8a44.firebaseapp.com",
};

console.log(`🔥 Connected to Custom Firebase Project: ${firebaseConfig.projectId}`);

export const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent cache to avoid deprecation warnings
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  // @ts-ignore - Handle possible type mismatch for databaseId if it's missing in some firebase versions
  databaseId: firebaseConfigTemp.firestoreDatabaseId
});

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
