// 🧩 Challenges: Outcasts Level 2
import { addCoins } from "../panel-coins/coins.js";

// Outcasts challenges are harder, more social
const OUTCAST_CHALLENGES = [
  { id: "recruit1", desc: "Recruit 1 new member into Unhinged", reward: 30 },
  { id: "chat10", desc: "Have 10 conversations today", reward: 20 },
  { id: "post2", desc: "Post twice on the Chaos Wall", reward: 25 },
  { id: "flirt3", desc: "Send 3 flirts today", reward: 15 }
];

export function getOutcastChallenges() {
  return OUTCAST_CHALLENGES;
}

export async function completeOutcastChallenge(uid, challengeId) {
  const challenge = OUTCAST_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
