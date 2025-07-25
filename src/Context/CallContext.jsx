import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { io } from "socket.io-client";

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [availableLawyers, setAvailableLawyers] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);
  const socketRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  const SOCKET_URL =
    import.meta.env.VITE_API_SOCKET || "http://192.168.1.43:4137";

  const initializeSocket = (token) => {
    // console.log("🛠️ Initializing socket with token:", token);
    // Prevent multiple initializations
    if (socketRef.current && isConnected) {
      console.log("ℹ️ Socket already connected. Skipping initialization.");
      return;
    }

    // console.log("🛠️ Initializing socket with token:", token);
    setInitialized(true);
    if (socketRef.current) {
      console.log(
        "ℹ️ Socket already exists. Disconnecting existing connection."
      );
      socketRef.current.disconnect();
    }

    console.log("🔌 Creating new socket connection to:", SOCKET_URL);
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    // Connection Events
    socket.on("connect", () => {
      console.log("✅ SOCKET CONNECTED! ID:", socket.id);
      setIsConnected(true);

      console.log("📤 Emitting 'user-login' event");
      socket.emit("user-login", {});
    });

    socket.on("connect_error", (err) => {
      console.error("❌ CONNECT ERROR:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ DISCONNECTED. Reason:", reason);
      setIsConnected(false);
    });

    // Login Events
    socket.on("login-success", (data) => {
      console.log("🎉 LOGIN SUCCESS! Data:", data);
      setUserRole(data.role);
      setUserId(data.userId);

      if (data.role !== "lawyer") {
        console.log("🔍 Fetching available lawyers");
        socket.emit("get-available-lawyers");
      }
    });

    socket.on("login-error", (data) => {
      console.error("⛔ LOGIN FAILED:", data.message);
    });

    // Call Events
    socket.on("incoming-call", (data) => {
      console.log("📞 INCOMING CALL! Data:", data);
      setIncomingCall(data);
    });

    socket.on("call-initiated", (data) => {
      console.log("📡 CALL INITIATED! Data:", data);
      setCurrentCall(data);
    });

    socket.on("call-accepted", (data) => {
      console.log("🤝 CALL ACCEPTED! Data:", data);
      setCurrentCall(data);
      setIncomingCall(null);
    });

    socket.on("call-rejected", (data) => {
      console.log("❌ CALL REJECTED! Data:", data);
      setIncomingCall(null);
      setCurrentCall(null);
    });

    socket.on("call-ended", (data) => {
      console.log("📴 CALL ENDED! Data:", data);
      setCurrentCall(null);
      setIncomingCall(null);
    });

    socket.on("call-error", (data) => {
      console.error("🚨 CALL ERROR:", data.message);
    });

    // Available Lawyers
    socket.on("available-lawyers", (data) => {
      console.log("👥 AVAILABLE LAWYERS:", data.lawyers);
      setAvailableLawyers(data.lawyers);
    });

    // Signal Events for WebRTC
    socket.on("signal", (data) => {
      console.log("📶 SIGNAL RECEIVED:", data);
    });

    socket.on("user-joined-room", (data) => {
      console.log("🚪 USER JOINED ROOM:", data);
    });

    socketRef.current = socket;
    return socket;
  };

  // Call Functions
  const callLawyer = (lawyerId, callType = "audio") => {
    if (!socketRef.current) {
      console.error("❌ Can't call - socket not initialized");
      return;
    }

    if (!isConnected) {
      console.error("❌ Can't call - socket disconnected");
      return;
    }

    console.log(`📞 CALLING LAWYER ${lawyerId} (${callType})`);
    socketRef.current.emit("call-lawyer", {
      lawyerId: parseInt(lawyerId),
      callType,
    });
  };

  const acceptCall = () => {
    if (!incomingCall) {
      console.error("❌ No incoming call to accept");
      return;
    }

    if (!socketRef.current || !isConnected) {
      console.error("❌ Can't accept call - socket not ready");
      return;
    }

    console.log(`✅ ACCEPTING CALL from ${incomingCall.fromUserId}`);
    socketRef.current.emit("accept-call", {
      roomId: incomingCall.roomId,
      fromUserId: incomingCall.fromUserId,
    });
  };

  const rejectCall = () => {
    if (!incomingCall) {
      console.error("❌ No incoming call to reject");
      return;
    }

    if (!socketRef.current || !isConnected) {
      console.error("❌ Can't reject call - socket not ready");
      return;
    }

    console.log(`❌ REJECTING CALL from ${incomingCall.fromUserId}`);
    socketRef.current.emit("reject-call", {
      roomId: incomingCall.roomId,
      fromUserId: incomingCall.fromUserId,
    });
  };

  const endCall = () => {
    if (!currentCall) {
      console.error("❌ No active call to end");
      return;
    }

    if (!socketRef.current || !isConnected) {
      console.error("❌ Can't end call - socket not ready");
      return;
    }

    console.log(`📴 ENDING CALL in room ${currentCall.roomId}`);
    socketRef.current.emit("end-call", { roomId: currentCall.roomId });
  };

  const getAvailableLawyers = () => {
    if (!socketRef.current || !isConnected) {
      console.error("❌ Can't get lawyers - socket not ready");
      return;
    }

    console.log("🔍 Fetching available lawyers");
    socketRef.current.emit("get-available-lawyers");
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      console.log("🔌 Disconnecting socket");
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setUserRole(null);
      setUserId(null);
      setAvailableLawyers([]);
      setIncomingCall(null);
      setCurrentCall(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("🧹 Cleaning up socket on component unmount");
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <CallContext.Provider
      value={{
        // Connection
        initializeSocket,
        disconnectSocket,
        isConnected,
        userRole,
        userId,

        // Call Functions
        callLawyer,
        acceptCall,
        rejectCall,
        endCall,
        getAvailableLawyers,

        // State
        availableLawyers,
        incomingCall,
        currentCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => useContext(CallContext);
