import React, { useEffect, useState, useRef } from "react";
import { db } from "../../config/firebase-config";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../config/firebase-config";

const Chat = ({ selectedUser, toggleChatbox, handleUserSelect }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderNames, setSenderNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
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
    if (Notification.permission === "granted") {
      new Notification(`New message from ${senderName}`, {
        body: messageText,
        icon: "../../assets/react.svg",
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

        const sortedMessages = messagesData.sort(
          (a, b) => a.timestamp - b.timestamp
        );

        if (isInitialLoad.current) {
          setMessages(sortedMessages);
          prevMessagesLength.current = sortedMessages.length;
          isInitialLoad.current = false;
          setLoading(false);
          return;
        }

        // Check for new messages
        if (sortedMessages.length > prevMessagesLength.current) {
          const lastMessage = sortedMessages[sortedMessages.length - 1];

          // Only notify if the message is not sent by the current user
          if (lastMessage.senderId !== currentUserId) {
            const senderName = await getSenderName(lastMessage.senderId);
            showNotification(senderName, lastMessage.text);
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

    // Notify when user is typing
    if (!typing) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
      }, 3000); // Typing indicator timeout
    }
  };

  return (
    <div className="w-full md:w-3/4 h-[95%] bg-white p-4 border border-gray-300 rounded-r-lg shadow-md flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {selectedUser ? selectedUser.displayName : "Select a User"}
        </h2>
        {typing && <div className="text-gray-500 italic">Typing...</div>}
      </div>
      <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-100 border border-gray-300 rounded-lg">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-lg w-fit max-w-[70%] ${
                msg.senderId === currentUserId
                  ? "bg-red-100 text-right ml-auto border border-b-0 border-red-300 rounded-tr-none"
                  : "bg-gray-300 text-left rounded-bl-none"
              } break-words`}
            >
              <span
                className={`font-medium ${
                  msg.senderId === currentUserId
                    ? "text-red-600"
                    : "text-gray-800"
                }`}
              >
                {msg.senderId === currentUserId
                  ? "You"
                  : senderNames[msg.senderId] || "Loading..."}
                :
              </span>{" "}
              <span className="ml-1 whitespace-pre-wrap">{msg.text}</span>
              <span className="text-gray-500 text-xs ml-2">
                {new Date(msg.timestamp).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400 resize-none overflow-y-auto max-h-[100px] bg-white"
          placeholder="Type your message here..."
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className={`ml-2 px-4 py-2 rounded-lg transition duration-200 ${
            message.trim()
              ? "bg-red-700 text-white hover:bg-red-600"
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
