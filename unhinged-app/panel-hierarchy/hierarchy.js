// 🧩 Hierarchy & Rank Engine
import { db } from "../core/core.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ⚡ Base hierarchy setup for Level 1 (Misfits only)
// Later we just add new levels (Outcasts, Nomads, etc.)
export const RANKS = [
  { level: 1, name: "Misfit", subRanks: 3 }
];

// 🎯 Get user rank
export async function getUserRank(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().rank || "Misfit I";
    }
    return "Unknown";
  } catch (err) {
    console.error("❌ Error getting rank:", err.message);
    return "Error";
  }
}

// ⬆️ Promote user rank
export async function promoteUser(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return false;

    const data = userDoc.data();
    let currentRank = data.rank || "Misfit I";

    // For now: Misfit I → Misfit II → Misfit III
    let nextRank = null;
    if (currentRank === "Misfit I") nextRank = "Misfit II";
    else if (currentRank === "Misfit II") nextRank = "Misfit III";

    if (nextRank) {
      await setDoc(
        doc(db, "users", uid),
        { rank: nextRank, lastActive: Date.now() },
        { merge: true }
      );
      return nextRank;
    } else {
      return currentRank; // no promotion available
    }
  } catch (err) {
    console.error("❌ Promotion error:", err.message);
    return false;
  }
}

// ⬇️ Demote user rank (for decay/purge system)
export async function demoteUser(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return false;

    const data = userDoc.data();
    let currentRank = data.rank || "Misfit I";

    let prevRank = null;
    if (currentRank === "Misfit III") prevRank = "Misfit II";
    else if (currentRank === "Misfit II") prevRank = "Misfit I";

    if (prevRank) {
      await setDoc(
        doc(db, "users", uid),
        { rank: prevRank, lastActive: Date.now() },
        { merge: true }
      );
      return prevRank;
    } else {
      return currentRank; // no demotion possible
    }
  } catch (err) {
    console.error("❌ Demotion error:", err.message);
    return false;
  }
}
