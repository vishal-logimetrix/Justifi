import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
  Backdrop,
  Typography,
  IconButton,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { keyframes } from "@emotion/react";
import chatBotApi from "../api/chatBotApi";
import bgImg from "../assets/images/img1.png";
// import bgImg from "../assets/images/img2.png";

// --- Animation Keyframes ---
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 0px rgba(0, 123, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 12px rgba(0, 123, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(0, 123, 255, 0.4);
  }
`;


const typingAnimation = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  }
  40% { 
    transform: scale(1.0);
  }
`;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFullscreen, setChatFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const sidebarTransition = "width 0.3s ease-in-out, margin 0.3s ease-in-out";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getBubbleColor = (sensitivity) => {
    switch (sensitivity) {
      case "Red":
        return "#ffebee";
      case "Amber":
        return "#fff8e1";
      case "Green":
        return "#e8f5e9";
      default:
        return "#f0f0f0";
    }
  };

  const renderBotResponse = (message) => {
    const { data, text } = message;
    return (
      <div style={{ width: "100%" }}>
        <div>{text}</div>

        {data?.relevant_sections?.length > 0 && (
          <div style={{ marginTop: 15 }}>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>
              Relevant Sections:
            </div>
            <TableContainer
              sx={{
                maxWidth: "100%",
                overflowX: "auto",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <Table size="small" sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Section</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Offense</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Punishment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.relevant_sections.map((section, idx) => (
                    <TableRow key={idx}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {section.Section}
                      </TableCell>
                      <TableCell>{section.Offense || "N/A"}</TableCell>
                      <TableCell>{section.Punishment || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {data?.lawyer_suggestions?.length > 0 && (
          <div style={{ marginTop: 15 }}>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>
              Recommended Lawyers:
            </div>
            {data.lawyer_suggestions.map((lawyer, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
              >
                <CallIcon
                  sx={{ color: "#4caf50", marginRight: 1, fontSize: "20px" }}
                />
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: "bold" }}>{lawyer.name}</div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lawyer.specialization}
                  </div>
                  <div>{lawyer.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatBotApi.post(`/chat`, { query: userMessage });
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

  const renderSidebar = () => {
    if (isSmallScreen && sidebarOpen) {
      return (
        <ClickAwayListener onClickAway={() => setSidebarOpen(false)}>
          <Box>
            <Sidebar open={true} />
            <Backdrop
              open={true}
              sx={{
                zIndex: 1100,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => setSidebarOpen(false)}
            />
          </Box>
        </ClickAwayListener>
      );
    }

    return <Sidebar open={sidebarOpen} />;
  };

  const TypingIndicator = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "12px 16px",
        borderRadius: "20px",
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            width: 8,
            height: 8,
            backgroundColor: "#a0a0a0",
            borderRadius: "50%",
            display: "inline-block",
            animation: `${typingAnimation} 1.4s infinite ease-in-out both`,
            animationDelay: `${
              index === 0 ? "-0.32s" : index === 1 ? "-0.16s" : "0s"
            }`,
            margin: "0 3px",
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        transition: sidebarTransition,
        position: "relative",
      }}
    >
      {renderSidebar()}

      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen && !isSmallScreen ? "260px" : 0,
          transition: sidebarTransition,
          width: "100%",
          position: "relative",
        }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            backgroundColor: theme.palette.background.default,
            minHeight: "calc(100vh - 64px)",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <main
            className="outlet-container"
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Outlet />
          </main>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          height={"50px"}
          sx={{
            textAlign: "center",
            py: 5,
            backgroundColor: theme.palette.grey[200],
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Justifi System. All rights reserved.
            <br />
            <i className="text-secondary">
              India's fastest-growing legal assistance platform
            </i>
          </Typography>
        </Box>

        {/* Chatbot Floating Icon with Animation */}
        {/* {!chatOpen && ( */}
        <IconButton
          onClick={() => setChatOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            animation: `${bounce} 1.8s infinite, ${glow} 3s infinite`,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          title="Chat With Rylaw"
        >
          <ChatIcon fontSize="medium" />
        </IconButton>
        {/* )} */}

        {/* Fullscreen Chat Backdrop */}
        {chatOpen && chatFullscreen && (
          <Backdrop
            open={true}
            sx={{
              zIndex: 1399,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}

        {/* Chatbot Window */}
        {chatOpen && (
          <Paper
            elevation={8}
            sx={{
              position: "fixed",
              bottom: chatFullscreen ? "50%" : 80,
              right: chatFullscreen ? "50%" : 24,
              transform: chatFullscreen ? "translate(50%, 50%)" : "none",
              width: chatFullscreen ? "60vw" : 320,
              height: chatFullscreen ? "85vh" : 400,
              zIndex: 1400,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              // Add background image with low opacity
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.3,
                zIndex: -1,
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                p: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative", // Ensure it's above the background
                zIndex: 1, // Keep header above background
              }}
            >
              <Typography variant="subtitle1">Chat with Rylaw</Typography>
              <Box>
                {/* Expand/Collapse Toggle */}
                <IconButton
                  size="small"
                  onClick={() => setChatFullscreen((prev) => !prev)}
                >
                  {chatFullscreen ? (
                    <CloseFullscreenIcon sx={{ color: "#fff" }} />
                  ) : (
                    <OpenInFullIcon sx={{ color: "#fff" }} />
                  )}
                </IconButton>

                {/* Close Button */}
                <IconButton
                  size="small"
                  onClick={() => {
                    setChatOpen(false);
                    setChatFullscreen(false);
                    setMessages([]);
                    setInput("");
                  }}
                >
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>

            {/* Chat Content */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                backgroundColor: "rgba(250, 250, 250, 0.7)",
                display: "flex",
                flexDirection: "column",
                position: "relative", // Ensure content is above background
                zIndex: 1, // Keep content above background
              }}
            >
              {messages.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    mt: 2,
                  }}
                >
                  Hi! How can I help you today?
                </Typography>
              )}

              {messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "85%",
                      padding: "12px 16px",
                      borderRadius: "20px",
                      fontSize: "15px",
                      lineHeight: 1.4,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      backgroundColor:
                        msg.sender === "user"
                          ? "#d1eaff"
                          : getBubbleColor(msg.data?.case_sensitivity),
                      borderBottomRightRadius: msg.sender === "user" ? 4 : 20,
                      borderBottomLeftRadius: msg.sender === "bot" ? 4 : 20,
                    }}
                  >
                    {msg.sender === "bot" ? renderBotResponse(msg) : msg.text}
                  </Box>
                </Box>
              ))}

              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      padding: "12px 16px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <TypingIndicator />
                  </Box>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box
              sx={{
                p: 1,
                borderTop: "1px solid #ddd",
                display: "flex",
                gap: 1,
                backgroundColor: "white",
                position: "relative", // Ensure it's above the background
                zIndex: 1, // Keep input area above background
              }}
            >
              <TextField
                multiline
                minRows={1}
                maxRows={4}
                size="small"
                placeholder="Type your legal query..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                inputRef={textareaRef}
                sx={{
                  flexGrow: 1,
                  "& .MuiInputBase-root": {
                    padding: "5px 12px",
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                sx={{
                  minWidth: "auto",
                  alignSelf: "flex-end",
                  height: "32px",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
