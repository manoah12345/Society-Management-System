import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp,
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

        // Sort notices by createdAt in descending order
        noticesList.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        );

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
    if (newNotice.trim()) {
      try {
        await addDoc(collection(db, "notices"), {
          text: newNotice,
          createdAt: Timestamp.now(),
        });

        setNewNotice(""); // Clear the input field after adding
      } catch (error) {
        console.error("Error adding notice:", error);
        alert("Failed to add notice. Please try again.");
      }
    } else {
      alert("Notice cannot be empty");
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

  // Function to format the date to a readable format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.toMillis());
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`; // Combine date and time
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>

      {/* Only Chairman can add new notices */}
      {role === "Chairman" && (
        <div className="my-4">
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y max-h-[150px] overflow-auto"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            placeholder="Add a new notice"
            rows="3"
          />
          <button
            onClick={handleAddNotice}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 transition duration-200 hover:bg-blue-600"
          >
            Add Notice
          </button>
        </div>
      )}

      {/* Conditional rendering for notices */}
      {notices.length === 0 ? (
        <div className="text-gray-500 text-center">No Notices</div>
      ) : (
        <ul>
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="border-b py-3 flex justify-between items-start bg-white rounded-lg shadow-sm mb-2 transition duration-200 hover:bg-gray-50 px-3"
            >
              <div>
                <span className="font-semibold">{notice.text}</span>
                <div className="text-gray-500 text-sm">
                  {formatDate(notice.createdAt)}{" "}
                  {/* Display formatted date and time */}
                </div>
              </div>
              {/* Only Chairman can delete a notice */}
              {role === "Chairman" && (
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="text-red-500 transition duration-200 hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notice;
