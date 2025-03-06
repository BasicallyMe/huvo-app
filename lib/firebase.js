import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "huvo-app.firebaseapp.com",
  projectId: "huvo-app",
  storageBucket: "huvo-app.firebasestorage.app",
  messagingSenderId: "496367272849",
  appId: "1:496367272849:web:a2d2b0734a66d6a789d030",
  measurementId: "G-77ZRD5LGP6",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(firebase);
