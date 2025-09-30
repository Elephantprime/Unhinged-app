// 🧩 Events: Royals Level 8
import { addCoins } from "../panel-coins/coins.js";

const ROYAL_EVENTS = [
  { time: "11:00", type: "parade", desc: "Royal Parade: show off influence" },
  { time: "17:00", type: "summit", desc: "Royal Summit: leadership collab" },
  { time: "20:00", type: "coronation", desc: "Royal Coronation Ceremony" }
];

export function getRoyalEvents() {
  return ROYAL_EVENTS;
}

export async function attendRoyalEvent(uid, eventType) {
  await addCoins(uid, 200);
  return true;
}
