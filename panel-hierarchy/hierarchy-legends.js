// 🧩 Hierarchy Extension: Legends (Level 9)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LEGEND_RANKS = [
  { level: 9, name: "Legend I" },
  { level: 9, name: "Legend II" },
  { level: 9, name: "Legend III" }
];

const PROMOTION_RULES = {
  coinsRequired: 20000,
  minFollowers: 200,
  globalImpact: true
};

export async function getUserLegendRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteLegend(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();

  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if ((data.followers || 0) < PROMOTION_RULES.minFollowers) return false;
  if (!data.globalImpact) return false;

  let nextRank = null;
  if (data.rank === "Legend I") nextRank = "Legend II";
  else if (data.rank === "Legend II") nextRank = "Legend III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return data.rank;
}
