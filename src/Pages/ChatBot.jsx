import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import chatBotApi from "../api/chatBotApi";
import bgImage from "../assets/images/12.jpg";

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
      case "Red": return "#ffebee";
      case "Amber": return "#fff8e1";
      case "Green": return "#e8f5e9";
      default: return "#f0f0f0";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatBotApi.post(`/chat`, { message: userMessage });
      const botResponse = response.data;

      const cleanedResponse = botResponse.response
        .split("\n")
        .filter(
          (line) =>
            !line.includes("Case Sensitivity Level:") &&
            !line.includes("Legal Category:") &&
            !line.includes("Need Lawyer:")
        )
        .join("\n")
        .trim();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: cleanedResponse, data: botResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          isError: true,
        },
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
    return (
      <div style={{ width: "100%" }}>
        <div>{text}</div>

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
        {/* ✅ Overlay to blur background inside chat box */}
        <div style={styles.chatOverlay}></div>

        <div style={styles.chatHeader}>Chat with Rylaw </div>
        {/* 🤖 */}
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
                  backgroundColor:
                    msg.sender === "user"
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
              cursor: isLoading ? "not-allowed" : "pointer",
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
  },
  chatBox: {
    width: "100%",
    height: "80vh",
    position: "relative",
    // backgroundImage: `url(${bgImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  chatOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(2px)",
    zIndex: 0,
  },
  chatHeader: {
    padding: "16px",
    borderBottom: "1px solid #eee",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 2,
    position: "relative",
  },
  chatMessages: {
    flexGrow: 1,
    padding: "16px",
    overflowY: "auto",
    zIndex: 2,
    position: "relative",
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
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  typingIndicator: {
    backgroundColor: "rgba(255,255,255,0.7)",
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
    animation: "typingAnimation 1.4s infinite ease-in-out both",
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
    backgroundColor: "rgba(255,255,255,0.9)",
    position: "sticky",
    bottom: 0,
    zIndex: 2,
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
  },
};

// Typing animation CSS
const addStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes typingAnimation {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  `;
  document.head.appendChild(style);
};
addStyles();

export default ChatBot;
