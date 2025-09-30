// 🧩 Events: Legends Level 9
import { addCoins } from "../panel-coins/coins.js";

const LEGEND_EVENTS = [
  { time: "12:00", type: "summit", desc: "Legend Global Summit" },
  { time: "18:00", type: "festival", desc: "Legend Festival of Influence" },
  { time: "22:00", type: "hall", desc: "Hall of Legends Ceremony" }
];

export function getLegendEvents() {
  return LEGEND_EVENTS;
}

export async function attendLegendEvent(uid, eventType) {
  await addCoins(uid, 500);
  return true;
}
