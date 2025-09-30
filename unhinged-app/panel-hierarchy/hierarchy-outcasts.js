// 🧩 Hierarchy Extension: Outcasts (Level 2)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getVault } from "../panel-coins/coins.js";
import { getIRLChallenges } from "../panel-irl/irl-outcasts.js";

// Define Outcasts ranks (3 sub-levels)
export const OUTCAST_RANKS = [
  { level: 2, name: "Outcast I" },
  { level: 2, name: "Outcast II" },
  { level: 2, name: "Outcast III" }
];

// Requirements for Outcast promotions
const PROMOTION_RULES = {
  coinsRequired: 100,
  irlProofRequired: true,
  vaultContribution: 20
};

export async function getUserOutcastRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteOutcast(uid, clubId = null) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();
  let currentRank = data.rank;

  // Must meet requirements
  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if (!data.irlCompleted) return false;
  if (clubId) {
    const vault = await getVault(clubId);
    if (vault < PROMOTION_RULES.vaultContribution) return false;
  }

  let nextRank = null;
  if (currentRank === "Outcast I") nextRank = "Outcast II";
  else if (currentRank === "Outcast II") nextRank = "Outcast III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return currentRank;
}
