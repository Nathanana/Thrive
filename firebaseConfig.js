// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAwttnEPJ1tXyXuXPk-PO0mDT7aQYAUGs",
  authDomain: "thrive-62cea.firebaseapp.com",
  projectId: "thrive-62cea",
  storageBucket: "thrive-62cea.firebasestorage.app",
  messagingSenderId: "707709595372",
  appId: "1:707709595372:web:bcc2f61acf845b6057ffc9",
  measurementId: "G-7MV08ZX1GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;