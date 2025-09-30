// 🧩 IRL Challenges: UNHINGED Level 10
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const UNHINGED_IRL = [
  { id: "festivalWorld", desc: "Host an Unhinged Festival (1000+ people)", reward: 20000 },
  { id: "movement1", desc: "Lead a global movement", reward: 25000 }
];

export function getUnhingedIRLChallenges() {
  return UNHINGED_IRL;
}

export async function submitUnhingedIRLProof(uid, challengeId, mediaUrl) {
  const challenge = UNHINGED_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), unhinged: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
