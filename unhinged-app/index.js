// 🌪️ Level 1 Test Harness
import { registerUser, loginUser, logoutUser } from "./panel-membership/membership.js";
import { getWallet, addCoins } from "./panel-coins/coins.js";
import { getDailyChallenges, completeChallenge } from "./panel-challenges/challenges.js";
import { postChaos } from "./panel-chaoswall/chaoswall.js";
import { addFriend, toggleFlirt } from "./panel-friendsflirts/friendsflirts.js";

let currentUid = null;

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  currentUid = await registerUser(email, password);
  document.getElementById("authStatus").innerText = "Registered: " + currentUid;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  currentUid = await loginUser(email, password);
  document.getElementById("authStatus").innerText = "Logged in: " + currentUid;
}

async function logout() {
  await logoutUser();
  currentUid = null;
  document.getElementById("authStatus").innerText = "Logged out";
}

async function getWalletUI() {
  if (!currentUid) return;
  const wallet = await getWallet(currentUid);
  document.getElementById("wallet").innerText = `Coins: ${wallet.coins}, Diamonds: ${wallet.diamonds}`;
}

async function earnCoins() {
  if (!currentUid) return;
  await addCoins(currentUid, 10);
  getWalletUI();
}

function showChallenges() {
  const challenges = getDailyChallenges();
  const list = document.getElementById("challengeList");
  list.innerHTML = "";
  challenges.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `${c.desc} (Reward: ${c.reward}) 
      <button onclick="completeChallengeUI('${c.id}')">Complete</button>`;
    list.appendChild(li);
  });
}

async function completeChallengeUI(challengeId) {
  if (!currentUid) return;
  await completeChallenge(currentUid, challengeId);
  getWalletUI();
}

async function postChaosUI() {
  if (!currentUid) return;
  const content = document.getElementById("chaosContent").value;
  await postChaos(currentUid, content);
  document.getElementById("chaosFeed").innerHTML += `<p>${content}</p>`;
}

async function addFriendUI() {
  if (!currentUid) return;
  const target = document.getElementById("friendId").value;
  await addFriend(currentUid, target);
  alert("Friend added!");
}

async function toggleFlirtUI() {
  if (!currentUid) return;
  const target = document.getElementById("friendId").value;
  await toggleFlirt(currentUid, target, true);
  alert("Flirt toggled!");
}

window.register = register;
window.login = login;
window.logout = logout;
window.getWalletUI = getWalletUI;
window.earnCoins = earnCoins;
window.showChallenges = showChallenges;
window.completeChallengeUI = completeChallengeUI;
window.postChaosUI = postChaosUI;
window.addFriendUI = addFriendUI;
window.toggleFlirtUI = toggleFlirtUI;