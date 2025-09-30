// 🧩 IRL Challenges: Nomads Level 3
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const NOMAD_IRL = [
  { id: "explore1", desc: "Visit a new place in your city and upload proof", reward: 45 },
  { id: "culture1", desc: "Attend a cultural event (concert, museum, festival)", reward: 50 },
  { id: "connect1", desc: "Meet another Nomad-level user IRL", reward: 60 }
];

export function getNomadIRLChallenges() {
  return NOMAD_IRL;
}

export async function submitNomadIRLProof(uid, challengeId, mediaUrl) {
  const challenge = NOMAD_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), nomad: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
