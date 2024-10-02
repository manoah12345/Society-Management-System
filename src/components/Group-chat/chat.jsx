import React, { useEffect, useState, useRef } from "react";
import { db } from "../../config/firebase-config"; // Import Firestore config
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../config/firebase-config"; // Import auth to get current user ID

const Chat = ({ selectedUser, toggleChatbox, handleUserSelect }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderNames, setSenderNames] = useState({});
  const currentUserId = auth.currentUser?.uid;
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(0);
  const isInitialLoad = useRef(true);

  const chatId =
    selectedUser && selectedUser.id === "society-group"
      ? "society-group"
      : currentUserId && selectedUser
      ? currentUserId < selectedUser.id
        ? `${currentUserId}_${selectedUser.id}`
        : `${selectedUser.id}_${currentUserId}`
      : null;

  const getSenderName = async (senderId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", senderId));
      if (userDoc.exists()) {
        return userDoc.data().displayName;
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
    return "Unknown";
  };

  // Request permission for notifications
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        console.error("Notification permission denied.");
      }
    });
  }, []);

  // Function to show a browser notification
  const showNotification = (senderName, messageText) => {
    console.log("Notification:", senderName, messageText);
    if (Notification.permission === "granted") {
      new Notification(`New message from ${senderName}`, {
        body: messageText,
        icon: "../../assets/react.svg", // Optional: specify an icon
      });
    }
  };

  useEffect(() => {
    if (selectedUser && chatId) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const unsubscribe = onSnapshot(messagesRef, async (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedMessages = messagesData.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });

        if (isInitialLoad.current) {
          setMessages(sortedMessages);
          prevMessagesLength.current = sortedMessages.length;
          isInitialLoad.current = false;
          return;
        }

        // Check for new messages
        if (sortedMessages.length > prevMessagesLength.current) {
          const lastMessage = sortedMessages[sortedMessages.length - 1];

          // Only notify if the message is not sent by the current user
          if (lastMessage.senderId !== currentUserId) {
            // Notify for both one-on-one and group messages if the chat is closed
            const senderName = await getSenderName(lastMessage.senderId);
            showNotification(senderName, lastMessage.text); // Show notification
          }
        }

        setMessages(sortedMessages);
        prevMessagesLength.current = sortedMessages.length;
      });

      return () => {
        unsubscribe();
        isInitialLoad.current = true;
      };
    }
  }, [selectedUser, chatId, currentUserId]);

  useEffect(() => {
    const fetchSenderNames = async () => {
      const names = {};
      for (const msg of messages) {
        if (!names[msg.senderId]) {
          const name = await getSenderName(msg.senderId);
          names[msg.senderId] = name;
        }
      }
      setSenderNames((prevNames) => ({ ...prevNames, ...names }));
    };

    if (messages.length > 0) {
      fetchSenderNames();
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedUser) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      await addDoc(messagesRef, {
        text: message,
        senderId: currentUserId,
        recipientId: selectedUser.id,
        timestamp: new Date().getTime(),
      });
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`;
    }
  };

  return (
    <div className="w-3/4 h-[95%] bg-gray-100 p-4 border-r border-gray-300 rounded-tr-[5px] rounded-br-[5px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-bold">
          {selectedUser ? selectedUser.displayName : "Select a User"}
        </h2>
      </div>
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
                  : senderNames[msg.senderId] || "Loading..."}
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
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 resize-none overflow-y-auto max-h-[100px]"
          placeholder="Type your message..."
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
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
