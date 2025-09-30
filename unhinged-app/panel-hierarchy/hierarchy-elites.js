// 🧩 Hierarchy Extension: Elites (Level 7)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getVault } from "../panel-coins/coins.js";

export const ELITE_RANKS = [
  { level: 7, name: "Elite I" },
  { level: 7, name: "Elite II" },
  { level: 7, name: "Elite III" }
];

const PROMOTION_RULES = {
  coinsRequired: 5000,
  minFollowers: 50,
  vaultContribution: 1000
};

export async function getUserEliteRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteElite(uid, clubId = null) {
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
  if (data.rank === "Elite I") nextRank = "Elite II";
  else if (data.rank === "Elite II") nextRank = "Elite III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return data.rank;
}
