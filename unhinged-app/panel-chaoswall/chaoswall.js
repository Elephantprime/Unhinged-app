// Placeholder comment
// 🧩 Chaos Wall Feed
import { db } from "../core/core.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";

// Post on Chaos Wall
export async function postChaos(uid, content, mediaUrl = null) {
  try {
    const postId = `${uid}_${Date.now()}`;
    await setDoc(doc(db, "chaoswall", postId), {
      uid,
      content,
      mediaUrl,
      likes: 0,
      roasts: 0,
      reacts: 0,
      createdAt: Date.now()
    });
    return true;
  } catch (err) {
    console.error("❌ Chaos Wall post error:", err.message);
    return false;
  }
}

// React to a Chaos Wall post
export async function reactChaos(postId, type = "like") {
  try {
    const postRef = doc(db, "chaoswall", postId);
    if (type === "like") {
      await updateDoc(postRef, { likes: increment(1) });
    } else if (type === "roast") {
      await updateDoc(postRef, { roasts: increment(1) });
    } else if (type === "react") {
      await updateDoc(postRef, { reacts: increment(1) });
    }
    return true;
  } catch (err) {
    console.error("❌ Chaos Wall react error:", err.message);
    return false;
  }
}
