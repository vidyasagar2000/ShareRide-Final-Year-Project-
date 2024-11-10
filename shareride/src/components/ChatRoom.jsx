import { useState, useEffect, useRef } from "react";
import "./ChatRoom.css"; // Ensure CSS classes are defined
import socket from "../socket"; // Ensure socket is properly configured
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/chatContext";

function ChatRoom() {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatAreaRef = useRef(null);
  const { user } = useAuth();
  const { isChatVisible, setIsChatVisible, chatWith, setChatWith } = useChat();

  // Scrolls the chat area to the bottom when messages are updated
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Join chat room when chat becomes visible
  useEffect(() => {
    if (isChatVisible && user?._id) {
      socket.emit("joinRoom", user._id);

      const handleIncomingMessage = (messages, user1, user2) => {
        if (
          (user1 === chatWith?.passenger?._id && user2 === user._id) ||
          (user2 === chatWith?.passenger?._id && user1 === user._id)
        ) {
          setChatMessages((prevMessages) => [...messages,...prevMessages]);
        }
      };

      socket.on("message", handleIncomingMessage);

      if (user?._id && chatWith?.passenger?._id) {
        socket.emit("openChat", { user1: user._id, user2: chatWith.passenger._id });
      }

      return () => {
        socket.off("message", handleIncomingMessage);
        socket.emit("leaveRoom", user._id); // Leave room when chat closes
        setChatWith(null);
      };
    }
  }, [isChatVisible, chatWith, user]);

  // Close the chat when clicking outside the chat area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatAreaRef.current && !chatAreaRef.current.contains(event.target)) {
        setChatMessages([]);
        setChatInput("");
        setChatWith({});
        setIsChatVisible(false); // close chat on clicking outside
      }
    };

    if (isChatVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatVisible]);

  useEffect(() => {
    if (!isChatVisible) {
      setChatMessages([]);
      setChatInput("");
      setChatWith({});
    }
  }, [isChatVisible]);

  // Send message via socket
  const handleSendMessage = (e) => {
    e.preventDefault();
     console.log("chat with",chatWith);
    if (chatInput.trim()) {
      const newMessage = {
        from: user.fullName,
        fromId: user._id,
        content: chatInput,
        timestamp: new Date().toLocaleTimeString(),
        to: chatWith?.passenger?.fullName,
        toId: chatWith?.passenger?._id,
      };

      socket.emit("message", newMessage, user._id, chatWith?.passenger?._id);
      setChatMessages((prevMessages) => [newMessage,...prevMessages]);
      setChatInput(""); // reset input after sending
    }
  };

  const handleCloseChatBtn = () => {
    setChatMessages([]);
    setChatInput("");
    setChatWith({});
    setIsChatVisible(false);
    socket.emit('close-chat',{user1:user?._id,user2:chatWith?.passenger?._id});
  };

  return (
    <div className="chat-room-container">
      {isChatVisible && (
        <div className="chat-area" ref={chatAreaRef}>
          <div className="chat-header">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="User Avatar" className="avatar-image" />
            ) : (
              <svg className="avatar-image" viewBox="0 0 512 512" fill="currentColor">
                {/* SVG content for avatar fallback */}
                <circle cx="256" cy="256" r="256" fill="#ddd" />
              </svg>
            )}
            <span className="chat-header-name">
              @{chatWith?.passenger?.fullName || user?.fullName}
            </span>
            <button className="close-chat-button" onClick={handleCloseChatBtn}>
              X
            </button>
          </div>
          <div className="messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.fromId === user._id ? "my-message" : "prabhat-message"}`}>
                <span className="message-user">{msg.from}:</span>
                <span className="message-content">{msg.content}</span>
                {/* <span className="message-time">{msg.timestamp}</span> */}
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
