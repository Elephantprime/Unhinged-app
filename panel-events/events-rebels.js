// 🧩 Events: Rebels Level 4
import { addCoins } from "../panel-coins/coins.js";

const REBEL_EVENTS = [
  { time: "13:00", type: "roast", desc: "Rebel Roast Battle Hour" },
  { time: "18:00", type: "clash", desc: "Chaos Clash: Rebels vs Nomads" },
  { time: "22:00", type: "storm", desc: "Rebel Storm: Flood the Chaos Wall together" }
];

export function getRebelEvents() {
  return REBEL_EVENTS;
}

export async function attendRebelEvent(uid, eventType) {
  await addCoins(uid, 30); // Rebel events = high energy, high payout
  return true;
}
