// 🧩 Challenges: Royals Level 8
import { addCoins } from "../panel-coins/coins.js";

const ROYAL_CHALLENGES = [
  { id: "court1", desc: "Hold a Royal Court (lead group chat)", reward: 600 },
  { id: "followers25", desc: "Gain 25 new followers in a week", reward: 700 },
  { id: "mentor3", desc: "Mentor 3 lower-ranked members", reward: 500 },
  { id: "invite20", desc: "Bring 20 recruits this month", reward: 1000 }
];

export function getRoyalChallenges() {
  return ROYAL_CHALLENGES;
}

export async function completeRoyalChallenge(uid, challengeId) {
  const challenge = ROYAL_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
