// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCylBfJyNXPKR9jqNjFPz5msNXTIeaxJO0",
  authDomain: "aitripplanner-cc4e3.firebaseapp.com",
  projectId: "aitripplanner-cc4e3",
  storageBucket: "aitripplanner-cc4e3.firebasestorage.app",
  messagingSenderId: "342734424817",
  appId: "1:342734424817:web:d543fc070aae156ada7750",
  measurementId: "G-9YCPDPL2RX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);