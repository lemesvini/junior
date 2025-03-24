// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase as fbGetDatabase, ref, set, onValue, update, push, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLI0XU4xneo6IHsJWz7isroekor_Er2ng",
  authDomain: "juniordevtools.firebaseapp.com",
  projectId: "juniordevtools",
  databaseURL: "https://juniordevtools-default-rtdb.firebaseio.com", // Add this line
  storageBucket: "juniordevtools.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "242853372787",
  appId: "1:242853372787:web:2ed5d3cb821a1672f1db06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export database functions
export const getDatabase = () => fbGetDatabase(app);
export { ref, set, onValue, update, push, get };