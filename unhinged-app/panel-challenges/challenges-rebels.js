// 🧩 Challenges: Rebels Level 4
import { addCoins } from "../panel-coins/coins.js";

const REBEL_CHALLENGES = [
  { id: "chaos5", desc: "Start 5 chaos posts in a day", reward: 60 },
  { id: "debate1", desc: "Engage in 3 debates on Chaos Wall", reward: 50 },
  { id: "clash1", desc: "Challenge another Rebel to a 1v1 roast battle", reward: 70 },
  { id: "invite3", desc: "Bring in 3 recruits today", reward: 80 }
];

export function getRebelChallenges() {
  return REBEL_CHALLENGES;
}

export async function completeRebelChallenge(uid, challengeId) {
  const challenge = REBEL_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
