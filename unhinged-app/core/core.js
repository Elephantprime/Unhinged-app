// 🌪️ Core Initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);

// Global services
export const auth = getAuth(app);
export const db = getFirestore(app);
