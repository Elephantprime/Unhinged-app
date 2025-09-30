// 🧩 Challenges: Nomads Level 3
import { addCoins } from "../panel-coins/coins.js";

const NOMAD_CHALLENGES = [
  { id: "travel1", desc: "Connect with 3 users from different cities", reward: 40 },
  { id: "story1", desc: "Post a Nomad story on Chaos Wall", reward: 35 },
  { id: "groupchat", desc: "Join and participate in a group chat", reward: 30 },
  { id: "invite2", desc: "Invite 2 new members today", reward: 50 }
];

export function getNomadChallenges() {
  return NOMAD_CHALLENGES;
}

export async function completeNomadChallenge(uid, challengeId) {
  const challenge = NOMAD_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return false;
  await addCoins(uid, challenge.reward);
  return true;
}
