// 🧩 Friends & Flirts Engine
import { db } from "../core/core.js";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Add friend
export async function addFriend(uid, targetUid) {
  try {
    await updateDoc(doc(db, "users", uid), {
      friends: arrayUnion(targetUid)
    });
    await updateDoc(doc(db, "users", targetUid), {
      friends: arrayUnion(uid)
    });
    return true;
  } catch (err) {
    console.error("❌ Add friend error:", err.message);
    return false;
  }
}

// Remove friend
export async function removeFriend(uid, targetUid) {
  try {
    await updateDoc(doc(db, "users", uid), {
      friends: arrayRemove(targetUid)
    });
    await updateDoc(doc(db, "users", targetUid), {
      friends: arrayRemove(uid)
    });
    return true;
  } catch (err) {
    console.error("❌ Remove friend error:", err.message);
    return false;
  }
}

// Toggle flirt interest
export async function toggleFlirt(uid, targetUid, interested = true) {
  try {
    const userRef = doc(db, "users", uid);
    if (interested) {
      await updateDoc(userRef, {
        flirts: arrayUnion(targetUid)
      });
    } else {
      await updateDoc(userRef, {
        flirts: arrayRemove(targetUid)
      });
    }
    return true;
  } catch (err) {
    console.error("❌ Flirt toggle error:", err.message);
    return false;
  }
}

// Check if mutual interest exists
export async function isMutualFlirt(uid, targetUid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    const targetDoc = await getDoc(doc(db, "users", targetUid));

    if (userDoc.exists() && targetDoc.exists()) {
      const uFlirts = userDoc.data().flirts || [];
      const tFlirts = targetDoc.data().flirts || [];
      return uFlirts.includes(targetUid) && tFlirts.includes(uid);
    }
    return false;
  } catch (err) {
    console.error("❌ Mutual flirt check error:", err.message);
    return false;
  }
}// Placeholder comment
