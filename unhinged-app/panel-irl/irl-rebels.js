// 🧩 IRL Challenges: Rebels Level 4
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const REBEL_IRL = [
  { id: "protest1", desc: "Attend a protest or rally (document respectfully)", reward: 80 },
  { id: "stage1", desc: "Perform something live (music, comedy, speech)", reward: 90 },
  { id: "team1", desc: "Organize an IRL meetup with 3+ members", reward: 100 }
];

export function getRebelIRLChallenges() {
  return REBEL_IRL;
}

export async function submitRebelIRLProof(uid, challengeId, mediaUrl) {
  const challenge = REBEL_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), rebel: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
