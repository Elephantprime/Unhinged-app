// 🧩 Events: Outcasts Level 2
import { addCoins } from "../panel-coins/coins.js";

// Outcast events are scheduled chaos collabs
const OUTCAST_EVENTS = [
  { time: "10:00", type: "collab", desc: "Join another Outcast for a collab challenge" },
  { time: "15:00", type: "debate", desc: "Participate in Outcast Debate Hour" },
  { time: "21:00", type: "raid", desc: "Outcast Raid: spam the Chaos Wall with memes" }
];

export function getOutcastEvents() {
  return OUTCAST_EVENTS;
}

export async function attendOutcastEvent(uid, eventType) {
  await addCoins(uid, 15); // Outcast events give higher reward
  return true;
}
