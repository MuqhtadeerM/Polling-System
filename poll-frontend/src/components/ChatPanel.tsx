import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatPanel.css";

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "user1",
      userName: "User1",
      text: "Hey there, how can I help?",
      timestamp: new Date(),
    },
    {
      id: "2",
      userId: "user2",
      userName: "User2",
      text: "Nothing bro, just chillin!",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: "currentUser",
      userName: "Me",
      text: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // In real implementation, emit socket event
    // socketService.sendMessage(newMessage);
  };

  return (
    <div className="chat-panel">
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.userId === "currentUser" ? "own-message" : ""}`}
          >
            <div className="message-header">
              <span className="message-user">{message.userName}</span>
            </div>
            <div className="message-bubble">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};
