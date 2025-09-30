// 🧩 Hierarchy Extension: Rebels (Level 4)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getVault } from "../panel-coins/coins.js";

export const REBEL_RANKS = [
  { level: 4, name: "Rebel I" },
  { level: 4, name: "Rebel II" },
  { level: 4, name: "Rebel III" }
];

const PROMOTION_RULES = {
  coinsRequired: 500,
  minPosts: 10,
  vaultContribution: 100
};

export async function getUserRebelRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteRebel(uid, clubId = null) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();

  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if ((data.posts || 0) < PROMOTION_RULES.minPosts) return false;
  if (clubId) {
    const vault = await getVault(clubId);
    if (vault < PROMOTION_RULES.vaultContribution) return false;
  }

  let nextRank = null;
  if (data.rank === "Rebel I") nextRank = "Rebel II";
  else if (data.rank === "Rebel II") nextRank = "Rebel III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return data.rank;
}
