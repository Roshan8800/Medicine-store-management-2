import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN || "binayak-pharmacy-c4a0f.firebaseapp.com",
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || "binayak-pharmacy-c4a0f",
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET || "binayak-pharmacy-c4a0f.firebasestorage.app",
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID || "",
  databaseURL: Constants.expoConfig?.extra?.FIREBASE_DATABASE_URL || "",
};

const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

if (hasValidConfig) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export {
  app,
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
};

export type { FirebaseUser };

export const isFirebaseConfigured = hasValidConfig;

export const firebaseCollections = {
  medicines: "medicines",
  batches: "batches",
  invoices: "invoices",
  customers: "customers",
  suppliers: "suppliers",
  categories: "categories",
  users: "users",
  notifications: "notifications",
  backups: "backups",
  analytics: "analytics",
};

export async function syncToFirebase(collectionName: string, data: Record<string, unknown>[]) {
  if (!db) {
    console.warn("Firebase not configured - skipping sync");
    return;
  }
  
  const colRef = collection(db, collectionName);
  
  for (const item of data) {
    const docRef = doc(colRef, item.id as string);
    await setDoc(docRef, {
      ...item,
      syncedAt: Timestamp.now(),
    }, { merge: true });
  }
}

export function subscribeToCollection(
  collectionName: string,
  callback: (data: Record<string, unknown>[]) => void,
  constraints?: { field: string; operator: "==" | "!=" | ">" | "<"; value: unknown }[]
) {
  if (!db) {
    console.warn("Firebase not configured - skipping subscription");
    return () => {};
  }
  
  let q = collection(db, collectionName);
  
  if (constraints) {
    const queryConstraints = constraints.map(c => where(c.field, c.operator, c.value));
    q = query(q, ...queryConstraints) as any;
  }
  
  return onSnapshot(q as any, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
}
