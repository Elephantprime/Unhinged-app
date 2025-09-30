// 🧩 IRL Challenges: Outcasts Level 2
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const OUTCAST_IRL = [
  { id: "group1", desc: "Attend a local group event and upload proof", reward: 40 },
  { id: "help2", desc: "Do a visible act of kindness for a stranger", reward: 30 },
  { id: "sport1", desc: "Try a new sport or fitness activity", reward: 35 }
];

export function getOutcastIRLChallenges() {
  return OUTCAST_IRL;
}

export async function submitOutcastIRLProof(uid, challengeId, mediaUrl) {
  const challenge = OUTCAST_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), outcast: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
