// 🧩 Hierarchy Extension: Royals (Level 8)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getVault } from "../panel-coins/coins.js";

export const ROYAL_RANKS = [
  { level: 8, name: "Royal I" },
  { level: 8, name: "Royal II" },
  { level: 8, name: "Royal III" }
];

const PROMOTION_RULES = {
  coinsRequired: 10000,
  minFollowers: 100,
  vaultContribution: 2500
};

export async function getUserRoyalRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteRoyal(uid, clubId = null) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();

  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if ((data.followers || 0) < PROMOTION_RULES.minFollowers) return false;
  if (clubId) {
    const vault = await getVault(clubId);
    if (vault < PROMOTION_RULES.vaultContribution) return false;
  }

  let nextRank = null;
  if (data.rank === "Royal I") nextRank = "Royal II";
  else if (data.rank === "Royal II") nextRank = "Royal III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return data.rank;
}
