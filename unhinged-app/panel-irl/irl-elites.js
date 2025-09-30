// 🧩 IRL Challenges: Elites Level 7
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const ELITE_IRL = [
  { id: "conference1", desc: "Attend or speak at a conference", reward: 500 },
  { id: "hostMajor", desc: "Host a 25+ person event", reward: 600 },
  { id: "press2", desc: "Get featured in a larger press outlet", reward: 700 }
];

export function getEliteIRLChallenges() {
  return ELITE_IRL;
}

export async function submitEliteIRLProof(uid, challengeId, mediaUrl) {
  const challenge = ELITE_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), elite: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
