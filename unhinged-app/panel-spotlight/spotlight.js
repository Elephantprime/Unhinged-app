// Placeholder comm// 🧩 Community Spotlight Engine
import { db } from "../core/core.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { addCoins } from "../panel-coins/coins.js";

// Submit spotlight video (after uploading to storage)
export async function submitSpotlight(uid, mediaUrl, caption = "") {
  try {
    const spotlightId = `${uid}_${Date.now()}`;
    await setDoc(doc(db, "spotlight", spotlightId), {
      uid,
      mediaUrl,
      caption,
      votes: 0,
      submittedAt: Date.now()
    });
    return true;
  } catch (err) {
    console.error("❌ Spotlight submission error:", err.message);
    return false;
  }
}

// Cast a vote for a spotlight entry
export async function voteSpotlight(entryId) {
  try {
    const entryRef = doc(db, "spotlight", entryId);
    await updateDoc(entryRef, {
      votes: increment(1)
    });
    return true;
  } catch (err) {
    console.error("❌ Spotlight vote error:", err.message);
    return false;
  }
}

// Reward winner (manual for now, automate later)
export async function rewardWinner(entryId) {
  try {
    const entryDoc = await getDoc(doc(db, "spotlight", entryId));
    if (!entryDoc.exists()) return false;

    const { uid } = entryDoc.data();
    await addCoins(uid, 50); // winner bonus
    return true;
  } catch (err) {
    console.error("❌ Spotlight reward error:", err.message);
    return false;
  }
}ent for spotlight.js
