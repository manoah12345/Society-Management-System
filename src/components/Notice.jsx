import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

function Notice({ role }) {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  // Fetch notices from Firestore
  useEffect(() => {
    const fetchNotices = async () => {
      const querySnapshot = await getDocs(collection(db, "notices"));
      const noticesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(noticesList);
    };

    fetchNotices();
  }, []);

  // Function to add a new notice (Chairman only)
  const handleAddNotice = async () => {
    if (newNotice.trim()) {
      await addDoc(collection(db, "notices"), {
        text: newNotice,
        createdAt: new Date(),
      });
      setNewNotice(""); // Clear the input field after adding
      window.location.reload(); // Reload to reflect the added notice
    }
  };

  // Function to delete a notice (Chairman only)
  const handleDeleteNotice = async (id) => {
    await deleteDoc(doc(db, "notices", id));
    window.location.reload(); // Reload to reflect the deleted notice
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
Notice.jsx;
