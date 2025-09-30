// 🧩 Hierarchy Extension: Nomads (Level 3)
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getVault } from "../panel-coins/coins.js";

export const NOMAD_RANKS = [
  { level: 3, name: "Nomad I" },
  { level: 3, name: "Nomad II" },
  { level: 3, name: "Nomad III" }
];

const PROMOTION_RULES = {
  coinsRequired: 250,
  minFriends: 5,
  vaultContribution: 50
};

export async function getUserNomadRank(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) return userDoc.data().rank;
  return "Unknown";
}

export async function promoteNomad(uid, clubId = null) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return false;
  const data = userDoc.data();

  if ((data.coins || 0) < PROMOTION_RULES.coinsRequired) return false;
  if ((data.friends || []).length < PROMOTION_RULES.minFriends) return false;
  if (clubId) {
    const vault = await getVault(clubId);
    if (vault < PROMOTION_RULES.vaultContribution) return false;
  }

  let nextRank = null;
  if (data.rank === "Nomad I") nextRank = "Nomad II";
  else if (data.rank === "Nomad II") nextRank = "Nomad III";

  if (nextRank) {
    await setDoc(doc(db, "users", uid), { rank: nextRank, lastActive: Date.now() }, { merge: true });
    return nextRank;
  }
  return data.rank;
}
