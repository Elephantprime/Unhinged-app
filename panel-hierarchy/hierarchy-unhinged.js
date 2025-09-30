// 🧩 Hierarchy Extension: UNHINGED (Level 10)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const UNHINGED_RANK = { level: 10, name: "UNHINGED" };

const PROMOTION_RULES = {
  coinsRequired: 50000,
  ultimateProof: true
};

export async function getUserUnhingedRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteUnhinged(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();

  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if (!data.ultimateProof) return false;

  await setDoc(doc(db, "users", uid), { rank: UNHINGED_RANK.name, lastActive: Date.now() }, { merge: true });
  return UNHINGED_RANK.name;
}
