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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Tooltip,
  Avatar,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { keyframes } from "@emotion/react";
import chatBotApi from "../api/chatBotApi";
import bgImg from "../assets/images/img1.png";
import axios from "axios";

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
  const [user, setUser] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFullscreen, setChatFullscreen] = useState(false);
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isMediumScreen = useMediaQuery("(max-width:1024px)");
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
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatOpen) {
      loadChatHistory();
    }
  }, [chatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mock API functions - Replace these with your actual API calls
  const loadChatHistory = async () => {
    setLoadingHistory(true);
    try {
      const token = user.token;
      const option = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL_USER}rylaw_chat`,
        option
      );
      if (data.success && Array.isArray(data.chats)) {
        const formattedChats = data.chats.map((chat) => ({
          id: chat.chat_id,
          title: chat.title,
          lastMessage: "", // Placeholder since API doesn't return this
          timestamp: chat.created_at,
          messageCount: 0, // Placeholder since API doesn't return this
        }));

        setChatHistory(formattedChats);
      } else {
        setChatHistory([]);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

 const loadChatMessages = async (chatId) => {
  setIsLoading(true);

  try {
    const token = user.token;
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL_USER}rylaw_chat/${chatId}`, option);

    if (data.success && Array.isArray(data.chat)) {
      // Flatten each message into user and bot messages
      const formattedMessages = data.chat.flatMap((msg) => [
        {
          sender: "user",
          text: msg.query,
          timestamp: msg.created_at, // optional if you want to use it
        },
        {
          sender: "bot",
          text: msg.response?.trim() || "",
          timestamp: msg.created_at,
        },
      ]);

      setMessages(formattedMessages);
      setCurrentChatId(chatId);
    } else {
      setMessages([]);
    }

  } catch (error) {
    console.error("Error loading chat messages:", error);
  } finally {
    setIsLoading(false);
  }
};

  const createNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInput("");
    if (isSmallScreen) {
      setChatHistoryOpen(false);
    }
  };

  const deleteChatHistory = async (chatId, event) => {
    event.stopPropagation();
    try {
      // Replace with actual API call
      // await chatBotApi.delete(`/chat/${chatId}`);
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
      if (currentChatId === chatId) {
        createNewChat();
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
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
      const response = await chatBotApi.post(`/chat`, {
        message: userMessage,
        chat_id: currentChatId ? currentChatId : "",
        user_id: user.id,
      });
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

      // If this is a new chat, add it to history and set current chat ID
      if (!currentChatId) {
        // const newChatId = Date.now(); // Use timestamp as ID for demo
        const newChatId = "";
        setCurrentChatId(newChatId);
        const newChat = {
          id: newChatId,
          title:
            userMessage.substring(0, 50) +
            (userMessage.length > 50 ? "..." : ""),
          lastMessage:
            cleanedResponse.substring(0, 100) +
            (cleanedResponse.length > 100 ? "..." : ""),
          timestamp: new Date().toISOString(),
          messageCount: 2,
        };
        setChatHistory((prev) => [newChat, ...prev]);
      }
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
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

  // Chat History Sidebar Component
  const ChatHistorySidebar = () => (
    <Box
      sx={{
        width: isSmallScreen ? "280px" : "320px",
        height: "100%",
        backgroundColor: "#f7f7f8",
        borderRight: "1px solid #e5e5e5",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #e5e5e5",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2d3748" }}>
            Chat History
          </Typography>
          {isSmallScreen && (
            <IconButton
              size="small"
              onClick={() => setChatHistoryOpen(false)}
              sx={{ color: "#666" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={createNewChat}
          sx={{
            borderColor: "#d1d5db",
            color: "#374151",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f9fafb",
              borderColor: "#9ca3af",
            },
          }}
        >
          New Chat
        </Button>
      </Box>

      {/* Chat History List */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {loadingHistory ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : chatHistory.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <HistoryIcon sx={{ fontSize: 48, color: "#9ca3af", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No chat history yet
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Start a conversation to see your history
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 1 }}>
            {chatHistory.map((chat) => (
              <ListItem key={chat.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => loadChatMessages(chat.id)}
                  selected={currentChatId === chat.id}
                  sx={{
                    borderRadius: "8px",
                    mx: 1,
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#e5e7eb",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#dbeafe",
                      "&:hover": {
                        backgroundColor: "#bfdbfe",
                      },
                    },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: currentChatId === chat.id ? 600 : 400,
                        color: "#1f2937",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mb: 0.5,
                      }}
                    >
                      {chat.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6b7280",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                      }}
                    >
                      {chat.lastMessage}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#9ca3af",
                        fontSize: "10px",
                      }}
                    >
                      {formatTimestamp(chat.timestamp)} {" "}
                      {/* {formatTimestamp(chat.timestamp)} • {chat.messageCount}{" "} */}
                      messages
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add edit functionality
                        }}
                        sx={{
                          opacity: 0,
                          transition: "opacity 0.2s",
                          ".MuiListItemButton-root:hover &": {
                            opacity: 1,
                          },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={(e) => deleteChatHistory(chat.id, e)}
                        sx={{
                          opacity: 0,
                          transition: "opacity 0.2s",
                          ".MuiListItemButton-root:hover &": {
                            opacity: 1,
                          },
                          color: "#ef4444",
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
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

        {/* Mobile Chat History Toggle */}
        {chatOpen && isSmallScreen && (
          <IconButton
            onClick={() => setChatHistoryOpen(true)}
            sx={{
              position: "fixed",
              bottom: chatFullscreen ? 24 : 500,
              left: 24,
              zIndex: 1300,
              backgroundColor: "#f3f4f6",
              color: "#374151",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: "#e5e7eb",
              },
            }}
            title="Chat History"
          >
            <MenuIcon />
          </IconButton>
        )}

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

        {/* Mobile Chat History Drawer */}
        <Drawer
          anchor="left"
          open={chatHistoryOpen && isSmallScreen}
          onClose={() => setChatHistoryOpen(false)}
          sx={{
            zIndex: 1500,
            "& .MuiDrawer-paper": {
              width: "280px",
            },
          }}
        >
          <ChatHistorySidebar />
        </Drawer>

        {/* Chatbot Window */}
        {chatOpen && (
          <Paper
            elevation={8}
            sx={{
              position: "fixed",
              bottom: chatFullscreen ? "50%" : 80,
              right: chatFullscreen ? "50%" : 24,
              transform: chatFullscreen ? "translate(50%, 50%)" : "none",
              width: chatFullscreen
                ? isSmallScreen
                  ? "85vw"
                  : "75vw"
                : isSmallScreen
                ? "85vw"
                : isMediumScreen
                ? "400px"
                : "500px",
              height: chatFullscreen
                ? isSmallScreen
                  ? "85vh"
                  : "85vh"
                : isSmallScreen
                ? "70vh"
                : "500px",
              zIndex: 1400,
              display: "flex",
              flexDirection: "row",
              borderRadius: chatFullscreen ? 3 : 2,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "#fff",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Chat History Sidebar - Desktop */}
            {chatFullscreen && !isSmallScreen && (
              <Box sx={{ width: "320px", borderRight: "1px solid #e5e5e5" }}>
                <ChatHistorySidebar />
              </Box>
            )}

            {/* Main Chat Area */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #e5e5e5",
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#1f2937" }}
                    >
                      Rylaw Assistant
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      Legal AI Assistant
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {/* Mobile History Toggle */}
                  {isSmallScreen && (
                    <IconButton
                      size="small"
                      onClick={() => setChatHistoryOpen(true)}
                      sx={{ color: "#6b7280" }}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  {/* Expand/Collapse Toggle */}
                  <IconButton
                    size="small"
                    onClick={() => setChatFullscreen((prev) => !prev)}
                    sx={{ color: "#6b7280" }}
                  >
                    {chatFullscreen ? (
                      <CloseFullscreenIcon />
                    ) : (
                      <OpenInFullIcon />
                    )}
                  </IconButton>

                  {/* Close Button */}
                  <IconButton
                    size="small"
                    onClick={() => {
                      setChatOpen(false);
                      setChatFullscreen(false);
                      setChatHistoryOpen(false);
                    }}
                    sx={{ color: "#6b7280" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Chat Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  // backgroundImage: `url(${bgImg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundImage: `url(${bgImg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.05,
                    zIndex: -1,
                    pointerEvents: "none",
                  },
                }}
              >
                <Box sx={{ p: 3, position: "relative", zIndex: 1 }}>
                  {messages.length === 0 && (
                    <Box sx={{ textAlign: "center", mt: 8 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 64,
                          height: 64,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <SmartToyIcon sx={{ fontSize: 32 }} />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1f2937",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Welcome to Rylaw Assistant
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#6b7280",
                          maxWidth: "400px",
                          mx: "auto",
                        }}
                      >
                        Your intelligent legal assistant is here to help. Ask me
                        anything about legal matters, and I'll provide guidance
                        and relevant information.
                      </Typography>
                    </Box>
                  )}

                  {messages.map((msg, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        mb: 3,
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor:
                            msg.sender === "user"
                              ? "#10b981"
                              : theme.palette.primary.main,
                          flexShrink: 0,
                        }}
                      >
                        {msg.sender === "user" ? (
                          <PersonIcon sx={{ fontSize: 18 }} />
                        ) : (
                          <SmartToyIcon sx={{ fontSize: 18 }} />
                        )}
                      </Avatar>

                      {/* Message Content */}
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6b7280",
                            fontWeight: 500,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          {msg.sender === "user" ? "You" : "Rylaw Assistant"}
                        </Typography>

                        <Box
                          sx={{
                            backgroundColor:
                              msg.sender === "user"
                                ? "#f3f4f6"
                                : getBubbleColor(msg.data?.case_sensitivity) ||
                                  "#f9fafb",
                            padding: "16px",
                            borderRadius: "12px",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            border: "1px solid #e5e7eb",
                            position: "relative",
                          }}
                        >
                          {msg.sender === "bot"
                            ? renderBotResponse(msg)
                            : msg.text}
                        </Box>
                      </Box>
                    </Box>
                  ))}

                  {isLoading && (
                    <Box
                      sx={{
                        display: "flex",
                        mb: 3,
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          flexShrink: 0,
                        }}
                      >
                        <SmartToyIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6b7280",
                            fontWeight: 500,
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Rylaw Assistant
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: "#f9fafb",
                            padding: "16px",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            display: "inline-block",
                          }}
                        >
                          <TypingIndicator />
                        </Box>
                      </Box>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </Box>
              </Box>

              {/* Input Area */}
              <Box
                sx={{
                  p: 3,
                  borderTop: "1px solid #e5e7eb",
                  backgroundColor: "#fff",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-end",
                    maxWidth: "800px",
                    mx: "auto",
                  }}
                >
                  <TextField
                    multiline
                    minRows={1}
                    maxRows={4}
                    placeholder="Message Rylaw Assistant..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    inputRef={textareaRef}
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f9fafb",
                        borderRadius: "24px",
                        padding: "12px 20px",
                        fontSize: "15px",
                        border: "1px solid #d1d5db",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#fff",
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: 0,
                        "&::placeholder": {
                          color: "#9ca3af",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <IconButton
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    sx={{
                      backgroundColor:
                        input.trim() && !isLoading
                          ? theme.palette.primary.main
                          : "#e5e7eb",
                      color: input.trim() && !isLoading ? "#fff" : "#9ca3af",
                      width: 44,
                      height: 44,
                      "&:hover": {
                        backgroundColor:
                          input.trim() && !isLoading
                            ? theme.palette.primary.dark
                            : "#d1d5db",
                      },
                      "&:disabled": {
                        backgroundColor: "#e5e7eb",
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SendIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </Box>

                {/* Disclaimer */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: "#9ca3af",
                    mt: 2,
                    maxWidth: "600px",
                    mx: "auto",
                  }}
                >
                  Rylaw Assistant can make mistakes. Please verify important
                  legal information with qualified professionals.
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
