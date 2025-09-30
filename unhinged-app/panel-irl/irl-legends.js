// 🧩 IRL Challenges: Legends Level 9
import { addCoins } from "../panel-coins/coins.js";
import { db } from "../core/core.js";
import { doc, setDoc } from "firebase/firestore";

const LEGEND_IRL = [
  { id: "concert1", desc: "Host a concert or 100+ person event", reward: 2500 },
  { id: "charityMajor", desc: "Lead a major charity drive", reward: 2000 },
  { id: "featureGlobal", desc: "Be featured in global press", reward: 3000 }
];

export function getLegendIRLChallenges() {
  return LEGEND_IRL;
}

export async function submitLegendIRLProof(uid, challengeId, mediaUrl) {
  const challenge = LEGEND_IRL.find(c => c.id === challengeId);
  if (!challenge) return false;
  await setDoc(doc(db, "irl_submissions", `${uid}_${challengeId}`), {
    uid, challengeId, mediaUrl, submittedAt: Date.now(), legend: true
  });
  await addCoins(uid, challenge.reward);
  await setDoc(doc(db, "users", uid), { irlCompleted: true }, { merge: true });
  return true;
}
