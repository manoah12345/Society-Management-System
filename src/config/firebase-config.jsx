// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyBJs7Mvvn-WH00Brvlcm4Rkg6DYQliDg",
  authDomain: "society-management-f4f4e.firebaseapp.com",
  projectId: "society-management-f4f4e",
  storageBucket: "society-management-f4f4e.appspot.com",
  messagingSenderId: "230676232387",
  appId: "1:230676232387:web:4184dcc311952cbe1dca76",
  measurementId: "G-CCK68R6YFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);