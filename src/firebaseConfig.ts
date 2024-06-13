// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// src/firebaseConfig.ts
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABp3AqWDOA9jmCIYeB1A2lAOxg6VFvnV8",
  authDomain: "muscle-metrics-27853.firebaseapp.com",
  projectId: "muscle-metrics-27853",
  storageBucket: "muscle-metrics-27853.appspot.com",
  messagingSenderId: "479895727944",
  appId: "1:479895727944:web:c6e643647d25f13e3ecd7d",
  measurementId: "G-F1RCC4HDQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage ,app};