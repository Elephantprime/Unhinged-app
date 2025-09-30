// 🧩 Scheduled Events Engine
import { addCoins } from "../panel-coins/coins.js";

// Static schedule for Level 1
export const DAILY_EVENTS = [
  { time: "09:00", type: "challenge", desc: "Daily Challenges Drop" },
  { time: "12:00", type: "chaos", desc: "Chaos Wall Story Hour" },
  { time: "19:00", type: "spotlight", desc: "Spotlight Voting" },
  { time: "23:00", type: "open", desc: "Late-Night Open Chaos" }
];

// Get today's events
export function getTodayEvents() {
  return DAILY_EVENTS;
}

// Mark attendance for event
export async function attendEvent(uid, eventType) {
  try {
    // For Beta: reward small coin bonus for attending
    await addCoins(uid, 5);
    return true;
  } catch (err) {
    console.error("❌ Attend event error:", err.message);
    return false;
  }
}// Placeholder for events.js file
