// 🧩 Challenges: UNHINGED Level 10
import { addCoins } from "../panel-coins/coins.js";

const UNHINGED_CHALLENGES = [
  { id: "dominate", desc: "Dominate the platform for 1 week straight", reward: 10000 },
  { id: "hostWorld", desc: "Host a world-scale chaos event", reward: 15000 }
];

export function getUnhingedChallenges() {
  return UNHINGED_CHALLENGES;
}

export async function completeUnhingedChallenge(uid, challengeId) {
  const challenge = UNHINGED_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
