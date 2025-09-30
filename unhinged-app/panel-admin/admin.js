// Placeholder comment
// 🧩 Admin & Moderator Tools
import { db } from "../core/core.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// Delete post (Chaos Wall or Spotlight)
export async function deletePost(collection, postId) {
  try {
    await deleteDoc(doc(db, collection, postId));
    return true;
  } catch (err) {
    console.error("❌ Delete post error:", err.message);
    return false;
  }
}

// Verify IRL challenge submission
export async function verifyIRLSubmission(submissionId, approved = true) {
  try {
    const status = approved ? "approved" : "rejected";
    await updateDoc(doc(db, "irl_submissions", submissionId), {
      status
    });
    return true;
  } catch (err) {
    console.error("❌ IRL verification error:", err.message);
    return false;
  }
}

// Ban user (soft ban = deactivate account)
export async function banUser(uid) {
  try {
    await updateDoc(doc(db, "users", uid), {
      membershipActive: false,
      bannedAt: Date.now()
    });
    return true;
  } catch (err) {
    console.error("❌ Ban user error:", err.message);
    return false;
  }
}
