import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlX28k9fgJWEvTYjzPqRNQxSTz3UI2tv0",
  authDomain: "alpaago-52daa.firebaseapp.com",
  projectId: "alpaago-52daa",
  storageBucket: "alpaago-52daa.appspot.com",
  messagingSenderId: "705549336677",
  appId: "1:705549336677:web:551a6be8a9096de82ac68c",
  measurementId: "G-K4WEKT40YQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
