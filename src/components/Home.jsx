import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function Home() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chatbox visibility
  const navigate = useNavigate();

  // Fetch total number of users (members) from Firestore
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Get all documents from the 'users' collection
        setTotalMembers(querySnapshot.size); // Set the total number of users
      } catch (error) {
        console.error("Error fetching total members:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  const handleTotalMembersClick = () => {
    navigate("/members"); // Redirect to the /members page
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen); // Toggle chatbox visibility
  };

  return (
    <div className="h-full w-[82%] flex flex-col justify-around py-3 items-start">
      {/* Existing content */}
      <div className="flex justify-around w-full">
        <div className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200">
          Total number of Vehicles
        </div>
        <div
          className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleTotalMembersClick}
        >
          Total Members: {totalMembers}
        </div>
        <div className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200">
          Remaining empty Blocks
        </div>
      </div>

      {/* Chat Button (Chat Logo) */}
      <button
        onClick={toggleChatbox}
        className="mt-6 p-3 bg-blue-600 rounded-full fixed bottom-5 right-5 hover:bg-blue-700 transition duration-200"
      >
        {/* SVG Icon for Chat */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 3.866-3.582 7-8 7a8.961 8.961 0 01-4.514-1.198L3 19l1.34-3.351A6.961 6.961 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          />
        </svg>
      </button>

      {/* Chatbox (conditionally rendered) */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-5 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Chat</h2>
            <button
              onClick={toggleChatbox}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="mt-2">
            {/* Chat content here (e.g., messages) */}
            <p className="text-gray-600">This is a chatbox. Say hello!</p>
          </div>
          {/* Chat input */}
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button className="mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
