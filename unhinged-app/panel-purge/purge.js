// Placeholder for purge functionali// 🧩 Purge & Decay System
import { db } from "../core/core.js";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { demoteUser } from "../panel-hierarchy/hierarchy.js";

// Demote inactive user after 3 days
export async function applyDecay(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return false;

    const data = userDoc.data();
    const lastActive = data.lastActive || 0;
    const daysInactive = (Date.now() - lastActive) / (1000 * 60 * 60 * 24);

    if (daysInactive >= 3 && daysInactive < 10) {
      await demoteUser(uid);
    } else if (daysInactive >= 10) {
      await deleteDoc(doc(db, "users", uid));
    }
    return true;
  } catch (err) {
    console.error("❌ Decay/Purge error:", err.message);
    return false;
  }
}ty
