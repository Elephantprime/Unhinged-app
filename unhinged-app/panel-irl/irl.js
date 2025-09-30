// 🧩 IRL Challenge Layer
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

// Example IRL challenges
const IRL_CHALLENGES = [
  { id: "meet1", desc: "Meet someone new IRL and upload proof", reward: 20 },
  { id: "event1", desc: "Attend a local event and upload proof", reward: 25 },
  { id: "help1", desc: "Do a good deed for a stranger", reward: 15 }
];

// Fetch IRL challenges
export function getIRLChallenges() {
  return IRL_CHALLENGES;
}

// Submit proof (video/photo URL already uploaded to storage)
export async function submitIRLProof(uid, challengeId, mediaUrl) {
  const challenge = IRL_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;

  try {
    await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
      uid,
      challengeId,
      mediaUrl,
      submittedAt: Date.now()
    });

    await addCoins(uid, challenge.reward);
    return true;
  } catch (err) {
    console.error("❌ IRL proof error:", err.message);
    return false;
  }
}// Placeholder comment
