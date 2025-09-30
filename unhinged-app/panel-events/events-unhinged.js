// 🧩 Events: UNHINGED Level 10
import { addCoins } from "../panel-coins/coins.js";

const UNHINGED_EVENTS = [
  { time: "00:00", type: "chaos", desc: "24h Global Chaos Event" },
  { time: "20:00", type: "festival", desc: "Unhinged World Festival" }
];

export function getUnhingedEvents() {
  return UNHINGED_EVENTS;
}

export async function attendUnhingedEvent(uid, eventType) {
  await addCoins(uid, 1000);
  return true;
}
