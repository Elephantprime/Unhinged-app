// 🧩 Events: Nomads Level 3
import { addCoins } from "../panel-coins/coins.js";

const NOMAD_EVENTS = [
  { time: "11:00", type: "explore", desc: "Nomad Exploration Check-in" },
  { time: "16:00", type: "culture", desc: "Nomad Culture Hour (share pics from events)" },
  { time: "20:00", type: "circle", desc: "Nomad Circle: group chat with other Nomads" }
];

export function getNomadEvents() {
  return NOMAD_EVENTS;
}

export async function attendNomadEvent(uid, eventType) {
  await addCoins(uid, 20); // Nomad events = bigger payouts
  return true;
}
