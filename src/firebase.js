// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcmtxxiYaXkkbHRaEuqE9F9EIPQcVicM0",
  authDomain: "gamified-farming.firebaseapp.com",
  projectId: "gamified-farming",
  storageBucket: "gamified-farming.firebasestorage.app",
  messagingSenderId: "787156576830",
  appId: "1:787156576830:web:f0f54bb808df90378e3f6f",
  measurementId: "G-Q3RQZSHGEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Analytics is optional; guard if environment lacks measurement
try { getAnalytics(app); } catch (_) {}

// Auth exports used by the app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Persist auth across reloads
setPersistence(auth, browserLocalPersistence).catch(() => {});