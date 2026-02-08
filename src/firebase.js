// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { exp } from "firebase/firestore/pipelines";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC17KJQkLt6cnUa3I7wFQ30hMjmm74a-cQ",
  authDomain: "blood-hospital-500a5.firebaseapp.com",
  projectId: "blood-hospital-500a5",
  storageBucket: "blood-hospital-500a5.firebasestorage.app",
  messagingSenderId: "1066738833041",
  appId: "1:1066738833041:web:996590ef43221c5b209130",
  measurementId: "G-6ZHFHWN2RK"
};
export { firebaseConfig };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);