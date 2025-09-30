// 🧩 Coins & Economy Engine
import { db } from "../core/core.js";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// Base economy values
export const COIN_REWARD = 10;   // default reward per task
export const DIAMOND_RATE = 0.05; // 5 cents per diamond (for purchases)

// 🎯 Get user wallet
export async function getWallet(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return {
        coins: userDoc.data().coins || 0,
        diamonds: userDoc.data().diamonds || 0
      };
    }
    return { coins: 0, diamonds: 0 };
  } catch (err) {
    console.error("❌ Error getting wallet:", err.message);
    return { coins: 0, diamonds: 0 };
  }
}

// 💰 Add coins
export async function addCoins(uid, amount = COIN_REWARD) {
  try {
    await updateDoc(doc(db, "users", uid), {
      coins: increment(amount),
      lastActive: Date.now()
    });
    return true;
  } catch (err) {
    console.error("❌ Error adding coins:", err.message);
    return false;
  }
}

// 🪙 Spend coins
export async function spendCoins(uid, amount) {
  try {
    const wallet = await getWallet(uid);
    if (wallet.coins < amount) return false;

    await updateDoc(doc(db, "users", uid), {
      coins: wallet.coins - amount
    });
    return true;
  } catch (err) {
    console.error("❌ Error spending coins:", err.message);
    return false;
  }
}

// 💎 Add diamonds (from purchase)
export async function addDiamonds(uid, amount) {
  try {
    await updateDoc(doc(db, "users", uid), {
      diamonds: increment(amount)
    });
    return true;
  } catch (err) {
    console.error("❌ Error adding diamonds:", err.message);
    return false;
  }
}

// 🏦 Club Vault logic
export async function depositToVault(clubId, uid, amount) {
  try {
    // Deduct from user
    const success = await spendCoins(uid, amount);
    if (!success) return false;

    // Add to club vault
    await updateDoc(doc(db, "clubs", clubId), {
      vault: increment(amount)
    });

    return true;
  } catch (err) {
    console.error("❌ Error depositing to vault:", err.message);
    return false;
  }
}

export async function getVault(clubId) {
  try {
    const clubDoc = await getDoc(doc(db, "clubs", clubId));
    if (clubDoc.exists()) {
      return clubDoc.data().vault || 0;
    }
    return 0;
  } catch (err) {
    console.error("❌ Error getting vault:", err.message);
    return 0;
  }
}// Placeholder comment for coins.js
