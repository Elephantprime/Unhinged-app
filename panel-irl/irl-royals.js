// 🧩 IRL Challenges: Royals Level 8
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const ROYAL_IRL = [
  { id: "gala1", desc: "Host a gala or large-scale meetup", reward: 1200 },
  { id: "sponsor1", desc: "Secure a sponsorship or partnership", reward: 1000 },
  { id: "mediaGlobal", desc: "Be featured in national/global press", reward: 1500 }
];

export function getRoyalIRLChallenges() {
  return ROYAL_IRL;
}

export async function submitRoyalIRLProof(uid, challengeId, mediaUrl) {
  const challenge = ROYAL_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), royal: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
