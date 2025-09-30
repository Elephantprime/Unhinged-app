// 🌪️ Profile Page Logic
import { getWallet } from "./panel-coins/coins.js";
import { addFriend, toggleFlirt } from "./panel-friendsflirts/friendsflirts.js";
import { getUserRank } from "./panel-hierarchy/hierarchy.js";

let currentUid = null; // in real app, this comes from auth session

// Load profile (placeholder data for now)
async function loadProfile(uid) {
  currentUid = uid;

  // Mock username
  document.getElementById("username").innerText = "🔥 MisfitUser";

  // Rank
  const rank = await getUserRank(uid);
  document.getElementById("rank").innerText = `Rank: ${rank}`;

  // Wallet
  const wallet = await getWallet(uid);
  document.getElementById("wallet").innerText =
    `Coins: ${wallet.coins} | Diamonds: ${wallet.diamonds}`;

  // Badges (placeholder)
  document.getElementById("badges").innerHTML =
    `<span class="badge">Beta Tester</span>`;

  // Flirts + Likes (placeholder counters)
  document.getElementById("flirts").innerText = "❤️ 3";
  document.getElementById("likes").innerText = "👍 7";

  // Friends list (placeholder for now)
  document.getElementById("friends").innerHTML = `
    <li>Friend A</li>
    <li>Friend B</li>
    <li>Friend C</li>
  `;
}

// Action buttons
async function toggleFlirtUI() {
  if (!currentUid) return;
  const target = prompt("Enter UID to flirt with:");
  await toggleFlirt(currentUid, target, true);
  alert("Flirt sent!");
}

async function addFriendUI() {
  if (!currentUid) return;
  const target = prompt("Enter UID to add as friend:");
  await addFriend(currentUid, target);
  alert("Friend added!");
}

async function sendLike() {
  alert("Like sent! (Hook into likes counter later)");
}

// Load test profile on page load
window.onload = () => loadProfile("testUser123");

// Expose for buttons
window.toggleFlirtUI = toggleFlirtUI;
window.addFriendUI = addFriendUI;
window.sendLike = sendLike;
