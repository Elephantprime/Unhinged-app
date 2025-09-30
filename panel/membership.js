// 🧩 Membership & Access Engine
import { auth, db } from "../core/core.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const BASE_MEMBERSHIP_PRICE = 5.00;

export async function registerUser(email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    await setDoc(doc(db, "users", uid), {
      email,
      rank: "Misfit I",
      coins: 0,
      diamonds: 0,
      createdAt: Date.now(),
      lastActive: Date.now(),
      membershipActive: true
    });
    return uid;
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    throw err;
  }
}

export async function loginUser(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    await setDoc(doc(db, "users", uid), { lastActive: Date.now() }, { merge: true });
    return uid;
  } catch (err) {
    console.error("❌ Login error:", err.message);
    throw err;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("❌ Logout error:", err.message);
  }
}

export async function checkMembership(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) return userDoc.data().membershipActive === true;
    return false;
  } catch (err) {
    console.error("❌ Membership check error:", err.message);
    return false;
  }
}
