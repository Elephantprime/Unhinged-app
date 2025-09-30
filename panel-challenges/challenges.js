// 🧩 Daily Challenge Engine
import { addCoins } from "../panel-coins/coins.js";

// Simple challenge pool for Level 1
const CHALLENGES = [
  { id: "msg3", desc: "Message 3 new users today", reward: 10 },
  { id: "post1", desc: "Post once on the Chaos Wall", reward: 15 },
  { id: "vote1", desc: "Vote in Spotlight contest", reward: 5 }
];

// 🎯 Fetch daily challenges (rotates daily)
export function getDailyChallenges() {
  // For Beta → return static challenges
  return CHALLENGES;
}

// ✅ Complete a challenge
export async function completeChallenge(uid, challengeId) {
  const challenge = CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;

  try {
    await addCoins(uid, challenge.reward);
    return true;
  } catch (err) {
    console.error("❌ Challenge completion error:", err.message);
    return false;
  }
}// Placeholder comment
