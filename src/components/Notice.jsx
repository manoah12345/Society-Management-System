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
  const [importance, setImportance] = useState("optional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notices from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notices"),
      (querySnapshot) => {
        const noticesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort notices by importance and createdAt
        noticesList.sort((a, b) => {
          const importanceRank = {
            "very important": 1,
            important: 2,
            optional: 3,
          };
          return (
            importanceRank[a.importance] - importanceRank[b.importance] ||
            b.createdAt.toMillis() - a.createdAt.toMillis()
          );
        });

        setNotices(noticesList);
      },
      (error) => {
        console.error("Error fetching notices:", error);
        setError("Failed to fetch notices. Please refresh.");
      }
    );

    return () => unsubscribe();
  }, []);

  // Function to add a new notice (Chairman only)
  const handleAddNotice = async () => {
    if (newNotice.trim()) {
      setLoading(true);
      setError(null);
      try {
        await addDoc(collection(db, "notices"), {
          text: newNotice,
          createdAt: Timestamp.now(),
          importance,
        });

        setNewNotice("");
        setImportance("optional");
      } catch (error) {
        console.error("Error adding notice:", error);
        setError("Failed to add notice. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Notice cannot be empty");
    }
  };

  // Function to delete a notice (Chairman only)
  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteDoc(doc(db, "notices", id));
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("Failed to delete notice. Please try again.");
      }
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
    return `${formattedDate} at ${formattedTime}`;
  };

  // Function to get dot color based on importance
  const getDotColor = (importance) => {
    switch (importance) {
      case "very important":
        return "bg-red-700";
      case "important":
        return "bg-orange-500";
      case "optional":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Only Chairman can add new notices */}
      {role === "Chairman" && (
        <div className="my-4">
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y max-h-[150px] overflow-auto"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            placeholder="Add a new notice"
            rows="3"
          />
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className="mt-2 mb-4 border rounded-lg p-2 w-full"
          >
            <option value="optional">Optional</option>
            <option value="important">Important</option>
            <option value="very important">Very Important</option>
          </select>
          <button
            onClick={handleAddNotice}
            disabled={loading} // Disable button while loading
            className={`bg-red-700 text-white px-4 py-2 rounded-lg mt-2 transition duration-200 hover:bg-red-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Add Notice"
          >
            {loading ? "Adding..." : "Add Notice"}
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
              <div className="flex items-start">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${getDotColor(
                    notice.importance
                  )}`}
                />
                <div>
                  <span className="font-semibold">{notice.text}</span>
                  <div className="text-gray-500 text-sm">
                    {formatDate(notice.createdAt)}
                  </div>
                </div>
              </div>
              {/* Only Chairman can delete a notice */}
              {role === "Chairman" && (
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="relative inline-flex items-center justify-center p-2 transition duration-200 bg-transparent text-red-500 rounded-full hover:bg-gray-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  aria-label="Delete Notice"
                >
                  <span className="absolute inset-0 rounded-full ring-1 ring-gray-300 opacity-0 transition-opacity duration-200 hover:opacity-100"></span>
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
