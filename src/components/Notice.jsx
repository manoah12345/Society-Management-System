import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot, // Import onSnapshot for real-time updates
} from "firebase/firestore";
import { db } from "../config/firebase-config";

function Notice({ role }) {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  // Fetch notices from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notices"),
      (querySnapshot) => {
        const noticesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotices(noticesList);
      },
      (error) => {
        console.error("Error fetching notices:", error);
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Function to add a new notice (Chairman only)
  const handleAddNotice = async () => {
    console.log("Adding notice:", newNotice); // Debug log
    if (newNotice.trim()) {
      try {
        await addDoc(collection(db, "notices"), {
          text: newNotice,
          createdAt: new Date(),
        });

        setNewNotice(""); // Clear the input field after adding
      } catch (error) {
        console.error("Error adding notice:", error);
        alert("Failed to add notice. Please try again."); // User feedback
      }
    } else {
      alert("Notice cannot be empty"); // Alert for empty notice
    }
  };

  // Function to delete a notice (Chairman only)
  const handleDeleteNotice = async (id) => {
    try {
      await deleteDoc(doc(db, "notices", id));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold">Notices</h2>

      {/* Only Chairman can add new notices */}
      {role === "Chairman" && (
        <div className="my-4">
          <textarea
            className="w-full p-2 border rounded"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            placeholder="Add a new notice"
          />
          <button
            onClick={handleAddNotice}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Notice
          </button>
        </div>
      )}

      {/* List of Notices */}
      <ul>
        {notices.map((notice) => (
          <li key={notice.id} className="border-b py-2 flex justify-between">
            <span>{notice.text}</span>
            {/* Only Chairman can delete a notice */}
            {role === "Chairman" && (
              <button
                onClick={() => handleDeleteNotice(notice.id)}
                className="text-red-500"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notice;
