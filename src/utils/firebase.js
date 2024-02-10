// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWYoWZxTtuzhrnQKLJjOlYPWk9K2TS4Hc",
  authDomain: "netflixgpt-fe0be.firebaseapp.com",
  projectId: "netflixgpt-fe0be",
  storageBucket: "netflixgpt-fe0be.appspot.com",
  messagingSenderId: "207300874853",
  appId: "1:207300874853:web:f9ee119a5e0f08923fec8c",
  measurementId: "G-F0S4QD8YVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();