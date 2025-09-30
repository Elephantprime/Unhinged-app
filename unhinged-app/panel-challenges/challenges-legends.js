// 🧩 Challenges: Legends Level 9
import { addCoins } from "../panel-coins/coins.js";

const LEGEND_CHALLENGES = [
  { id: "hostGlobal", desc: "Host a global event or campaign", reward: 2000 },
  { id: "followers50", desc: "Gain 50 followers in a week", reward: 1500 },
  { id: "mentor10", desc: "Mentor 10 lower-ranked users", reward: 1000 }
];

export function getLegendChallenges() {
  return LEGEND_CHALLENGES;
}

export async function completeLegendChallenge(uid, challengeId) {
  const challenge = LEGEND_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
