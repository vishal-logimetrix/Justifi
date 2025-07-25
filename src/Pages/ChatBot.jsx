import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import chatBotApi from "../api/chatBotApi";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBubbleColor = (sensitivity) => {
    switch (sensitivity) {
      case "Red": return "#ffebee"; // Light red
      case "Amber": return "#fff8e1"; // Light amber
      case "Green": return "#e8f5e9"; // Light green
      default: return "#f0f0f0"; // Default light gray
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    
    // Add user message
    const newMessage = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send to API with correct body format
      const response = await chatBotApi.post(`/chat`, { query: userMessage });
      const botResponse = response.data;
      
      // Clean the response text by removing the sensitivity lines
      const cleanedResponse = botResponse.response
        .split('\n')
        .filter(line => 
          !line.includes('Case Sensitivity Level:') && 
          !line.includes('Legal Category:') && 
          !line.includes('Need Lawyer:')
        )
        .join('\n')
        .trim();
      
      // Add bot response with all data
      setMessages((prev) => [
        ...prev, 
        { 
          sender: "bot", 
          text: cleanedResponse,
          data: botResponse
        }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderBotResponse = (message) => {
    const { data, text } = message;
    const sensitivity = data?.case_sensitivity || "";
    
    return (
      <div style={{ width: "100%" }}>
        {/* Main response text */}
        <div>{text}</div>
        
        {/* Relevant sections table */}
        {data?.relevant_sections?.length > 0 && (
          <div style={{ marginTop: 15 }}>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>Relevant Sections:</div>
            <div style={styles.sectionTable}>
              <div style={styles.tableRow}>
                <div style={{ ...styles.tableCell, ...styles.tableHeader }}>Section</div>
                <div style={{ ...styles.tableCell, ...styles.tableHeader }}>Offense</div>
                <div style={{ ...styles.tableCell, ...styles.tableHeader }}>Punishment</div>
              </div>
              {data.relevant_sections.map((section, idx) => (
                <div key={idx} style={styles.tableRow}>
                  <div style={{ ...styles.tableCell, fontWeight: "bold" }}>{section.Section}</div>
                  <div style={styles.tableCell}>{section.Offense || "N/A"}</div>
                  <div style={styles.tableCell}>{section.Punishment || "N/A"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Lawyer suggestions */}
        {data?.lawyer_suggestions?.length > 0 && (
          <div style={{ marginTop: 15 }}>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>Recommended Lawyers:</div>
            {data.lawyer_suggestions.map((lawyer, idx) => (
              <div key={idx} style={styles.lawyerCard}>
                <CallIcon style={{ color: "#4caf50", marginRight: 10 }} />
                <div>
                  <div style={{ fontWeight: "bold" }}>{lawyer.name}</div>
                  <div>{lawyer.specialization}</div>
                  <div>{lawyer.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        <div style={styles.chatHeader}>Chat with LegalBot 🤖</div>
        <div style={styles.chatMessages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.chatMessage,
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.chatBubble,
                  backgroundColor: msg.sender === "user" 
                    ? "#d1eaff" 
                    : getBubbleColor(msg.data?.case_sensitivity),
                  borderBottomRightRadius: msg.sender === "user" ? 4 : 20,
                  borderBottomLeftRadius: msg.sender === "bot" ? 4 : 20,
                }}
              >
                {msg.sender === "bot" ? renderBotResponse(msg) : msg.text}
              </div>
            </div>
          ))}
          
          {/* WhatsApp-style typing indicator */}
          {isLoading && (
            <div style={{ ...styles.chatMessage, justifyContent: "flex-start" }}>
              <div style={styles.typingIndicator}>
                <div className="typing-dot" style={styles.typingDot}></div>
                <div className="typing-dot" style={styles.typingDot}></div>
                <div className="typing-dot" style={styles.typingDot}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        <div style={styles.inputContainer}>
          <textarea
            style={styles.textarea}
            placeholder="Type your legal query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
          />
          <button 
            style={{ 
              ...styles.sendButton, 
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }} 
            onClick={sendMessage}
            disabled={isLoading}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    overflowX: "hidden",
  },
  chatBox: {
    width: "100%",
    height: "80vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  chatHeader: {
    padding: "16px",
    borderBottom: "1px solid #eee",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  chatMessages: {
    flexGrow: 1,
    padding: "16px",
    overflowY: "auto",
  },
  chatMessage: {
    display: "flex",
    marginBottom: "12px",
  },
  chatBubble: {
    maxWidth: "85%",
    padding: "12px 16px",
    borderRadius: "20px",
    fontSize: "15px",
    lineHeight: "1.4",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  // WhatsApp-style typing indicator
  typingIndicator: {
    backgroundColor: "#f0f0f0",
    padding: "12px 16px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  typingDot: {
    width: "8px",
    height: "8px",
    margin: "0 3px",
    backgroundColor: "#a0a0a0",
    borderRadius: "50%",
    display: "inline-block",
  },
  sectionTable: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "5px",
  },
  tableRow: {
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCell: {
    padding: "8px 12px",
    flex: 1,
    fontSize: "14px",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
  lawyerCard: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    marginBottom: "8px",
    fontSize: "14px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#fff",
    position: "sticky",
    bottom: 0,
  },
  textarea: {
    flexGrow: 1,
    resize: "none",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    marginRight: "8px",
    outline: "none",
    minHeight: "45px",
    maxHeight: "150px",
    overflowY: "auto",
  },
  sendButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
};

// Add CSS for typing animation
const addStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes typingAnimation {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
    
    .typing-dot {
      animation: typingAnimation 1.4s infinite ease-in-out both;
    }
    
    .typing-dot:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    .typing-dot:nth-child(2) {
      animation-delay: -0.16s;
    }
  `;
  document.head.appendChild(style);
};

// Inject the styles when component mounts
addStyles();

export default ChatBot;