// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_VERCEL_FIREBASE_API,
  authDomain: process.env.REACT_APP_VERCEL_DOMAIN,
  projectId: process.env.REACT_APP_VERCEL_PROJECT_ID,
  storageBucket: process.env.REACT_APP_VERCEL_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_VERCEL_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_VERCEL_APP_ID,
  measurementId: process.env.REACT_APP_VERCEL_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
