import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase-config"; // Import Firestore config
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { auth } from "../../config/firebase-config"; // Import auth to get current user ID

const Chat = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUserId = auth.currentUser?.uid; // Get the current user's ID

  // Create a unique chat ID by concatenating user IDs
  const chatId =
    currentUserId && selectedUser
      ? currentUserId < selectedUser.id
        ? `${currentUserId}_${selectedUser.id}`
        : `${selectedUser.id}_${currentUserId}`
      : null; // Set chatId to null if either ID is missing

  useEffect(() => {
    if (selectedUser && chatId) {
      // Subscribe to messages for the selected user using the unique chat ID
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort messages by timestamp
        const sortedMessages = messagesData.sort((a, b) => {
          return a.timestamp - b.timestamp; // Sort in ascending order
        });

        setMessages(sortedMessages);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [selectedUser, chatId]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedUser) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      // Send the message to Firestore with sender's and recipient's IDs
      await addDoc(messagesRef, {
        text: message,
        senderId: currentUserId, // Store the ID of the sender
        recipientId: selectedUser.id, // Store the ID of the recipient
        timestamp: new Date().getTime(), // Store the timestamp in milliseconds
      });
      setMessage("");
    }
  };

  return (
    <div className="w-3/4 h-[95%] bg-gray-100 p-4 border-r border-gray-300 rounded-tr-[5px] rounded-br-[5px] flex flex-col">
      {/* Chat Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">
          Chat with {selectedUser ? selectedUser.displayName : "Select a User"}
        </h2>
      </div>

      {/* Chat Messages Display Area */}
      <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-white">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${
                msg.senderId === currentUserId ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`font-medium ${
                  msg.senderId === currentUserId
                    ? "text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {msg.senderId === currentUserId
                  ? "You"
                  : selectedUser.displayName}
                :
              </span>{" "}
              <span>{msg.text}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
