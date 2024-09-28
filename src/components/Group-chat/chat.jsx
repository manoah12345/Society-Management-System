import React, { useState, useEffect, useRef } from "react";
import { db } from "../../config/firebase-config"; // Import Firestore config
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../config/firebase-config"; // Import auth to get current user ID
import { toast } from "react-toastify"; // Import toast

const Chat = ({ selectedUser, toggleChatbox, handleUserSelect }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUserId = auth.currentUser?.uid; // Get the current user's ID
  const textareaRef = useRef(null); // Create a ref for the textarea
  const messagesEndRef = useRef(null); // Create a ref for the messages container
  const prevMessagesLength = useRef(0); // To keep track of the previous messages count
  const isInitialLoad = useRef(true); // Track whether the chat is being opened for the first time

  // Create a unique chat ID by concatenating user IDs
  const chatId =
    currentUserId && selectedUser
      ? currentUserId < selectedUser.id
        ? `${currentUserId}_${selectedUser.id}`
        : `${selectedUser.id}_${currentUserId}`
      : null; // Set chatId to null if either ID is missing

  // Function to fetch the sender's display name
  const getSenderName = async (senderId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", senderId));
      if (userDoc.exists()) {
        return userDoc.data().displayName; // Assuming 'displayName' is the field
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
    return "Unknown"; // Fallback in case of an error
  };

  useEffect(() => {
    if (selectedUser && chatId) {
      // Subscribe to messages for the selected user using the unique chat ID
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const unsubscribe = onSnapshot(messagesRef, async (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort messages by timestamp
        const sortedMessages = messagesData.sort((a, b) => {
          return a.timestamp - b.timestamp; // Sort in ascending order
        });

        // Check if the messages are loaded for the first time (i.e., chat opened)
        if (isInitialLoad.current) {
          // Update messages without triggering a notification
          setMessages(sortedMessages);
          prevMessagesLength.current = sortedMessages.length;
          isInitialLoad.current = false; // Mark that the initial load is complete
          return; // Skip notification on initial load
        }

        // Check if a new message is received
        if (sortedMessages.length > prevMessagesLength.current) {
          // Get the last message
          const lastMessage = sortedMessages[sortedMessages.length - 1];

          // Only show notification if the message is sent to the current user and it's not from the active chat
          if (
            lastMessage.recipientId === currentUserId &&
            lastMessage.senderId !== currentUserId
          ) {
            // Fetch the sender's display name
            const senderName = await getSenderName(lastMessage.senderId);

            // Show notification using toast with an onClick handler to open the chatbox
            toast(`New message from ${senderName}: ${lastMessage.text}`, {
              onClick: async () => {
                // Fetch the full user details of the sender (assuming stored in Firestore)
                const senderDoc = await getDoc(
                  doc(db, "users", lastMessage.senderId)
                );
                if (senderDoc.exists()) {
                  const senderUser = senderDoc.data();
                  senderUser.id = lastMessage.senderId; // Add the sender ID to the user object

                  // Open the chatbox and select the user
                  handleUserSelect(senderUser);
                  toggleChatbox();
                }
              },
            });
          }
        }

        // Update the messages state
        setMessages(sortedMessages);
        prevMessagesLength.current = sortedMessages.length; // Update previous messages count
      });

      // Cleanup subscription on unmount
      return () => {
        unsubscribe();
        isInitialLoad.current = true; // Reset the flag for the next chat opening
      };
    }
  }, [selectedUser, chatId, currentUserId]); // Add currentUserId to dependencies

  // Scroll to the bottom of the messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Run this effect whenever messages change

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
      // Reset the textarea height after sending a message
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset to auto for recalculation
      }
    }
  };

  const handleKeyPress = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter") {
      // If Shift key is not held, send the message
      if (!e.shiftKey) {
        e.preventDefault(); // Prevent form submission
        handleSendMessage();
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    // Adjust the height of the textarea to fit content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      // Set the height to scroll height with a max of 100px
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`;
    }
  };

  return (
    <div className="w-3/4 h-[95%] bg-gray-100 p-4 border-r border-gray-300 rounded-tr-[5px] rounded-br-[5px] flex flex-col">
      {/* Chat Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">
          {selectedUser ? selectedUser.displayName : "Select a User"}
        </h2>
      </div>

      {/* Chat Messages Display Area */}
      <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-white">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-bl-[10px] rounded-br-[10px] w-fit max-w-[70%] ${
                msg.senderId === currentUserId
                  ? "bg-blue-100 text-right ml-auto border border-b-0 border-blue-200 rounded-tl-[10px]"
                  : "bg-gray-200 text-left rounded-tr-[10px]"
              } break-words`}
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
              <span className="ml-1 whitespace-pre-wrap">{msg.text}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
        {/* Reference element for scrolling */}
        <div ref={messagesEndRef} /> {/* This div will be scrolled into view */}
      </div>

      {/* Message Input Area */}
      <div className="flex">
        <textarea
          ref={textareaRef} // Attach ref to textarea
          value={message}
          onChange={handleChange} // Call handleChange to update state and resize
          onKeyDown={handleKeyPress} // Handle key events
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 resize-none overflow-y-auto max-h-[100px]"
          placeholder="Type your message..."
          rows={1} // Set a minimum of 1 row
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()} // Disable the button if input is empty
          className={`ml-2 px-4 py-2 rounded-lg transition duration-200 ${
            message.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
