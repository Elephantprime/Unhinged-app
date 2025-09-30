// 🧩 Events: Elites Level 7
import { addCoins } from "../panel-coins/coins.js";

const ELITE_EVENTS = [
  { time: "10:00", type: "summit", desc: "Elite Summit: strategy and planning" },
  { time: "18:00", type: "spotlight", desc: "Elite Spotlight Showcase" },
  { time: "22:00", type: "gala", desc: "Elite Gala: exclusive social chaos" }
];

export function getEliteEvents() {
  return ELITE_EVENTS;
}

export async function attendEliteEvent(uid, eventType) {
  await addCoins(uid, 100); // Elite events = prestige + max payout
  return true;
}
