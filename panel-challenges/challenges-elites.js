// 🧩 Challenges: Elites Level 7
import { addCoins } from "../panel-coins/coins.js";

const ELITE_CHALLENGES = [
  { id: "followers10", desc: "Gain 10 new followers in 24h", reward: 300 },
  { id: "spotlight3", desc: "Win 3 Spotlight contests", reward: 400 },
  { id: "mentor1", desc: "Mentor a lower-rank member", reward: 250 },
  { id: "invite10", desc: "Invite 10 new users this week", reward: 500 }
];

export function getEliteChallenges() {
  return ELITE_CHALLENGES;
}

export async function completeEliteChallenge(uid, challengeId) {
  const challenge = ELITE_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
