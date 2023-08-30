import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD45s0kAEJiX7xHrPIxeSmgLptDmTR-50Y",
  authDomain: "monkey-blog-705ad.firebaseapp.com",
  projectId: "monkey-blog-705ad",
  storageBucket: "monkey-blog-705ad.appspot.com",
  messagingSenderId: "149293758431",
  appId: "1:149293758431:web:285ce87cc5dd7ffa36f66a",
  measurementId: "G-4W7K2DCW1G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
