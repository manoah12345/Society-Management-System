import React, { useState } from "react";
import Chat from "./Group-chat/chat";
import Sidebar from "./Group-chat/Sidebar";

const Chatbox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chatbox visibility
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen); // Toggle chatbox visibility
  };

  return (
    <div>
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

      {/* Chatbox with slide-in animation from bottom-right */}
      <div
        className={`fixed bottom-5 right-5 transform ${
          isChatOpen
            ? "translate-y-0 translate-x-0 opacity-100 scale-100"
            : "translate-y-full translate-x-full opacity-0 scale-75"
        } transition-all duration-300 ease-in-out w-[80vw] h-[90vh] bg-white border border-gray-300 rounded-lg shadow-lg p-4`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Group Chat</h2>
          <button
            onClick={toggleChatbox}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mt-2 flex aspect-[1/3] w-full h-full">
          <Sidebar onUserSelect={handleUserSelect} />
          <Chat selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
