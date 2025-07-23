import { createContext, useContext, useState, useEffect } from 'react';
import { connectSocket, getSocket } from '../Socket/socket';

const CallContext = createContext();
// export const useCallContext = () => useContext(CallContext);

function useCallContext() {
  return useContext(CallContext);
}
export { useCallContext };

export const CallProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showCallPopup, setShowCallPopup] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem("userRole");
    // const user = JSON.parse(localStorage.getItem("userRole"));

    // 💡 Only connect if logged in & role is lawyer
    if ( !user || user !== "lawyer") return;
    // if (!token || !user || userRole !== "lawyer") return;

    // const io = connectSocket(token);
    const io = connectSocket();
    setSocket(io);

    const handleIncomingCall = (callData) => {
      setIncomingCall(callData);
      setShowCallPopup(true);

      setTimeout(() => {
        if (showCallPopup) {
          setShowCallPopup(false);
          io.emit("call-rejected", callData.callId);
        }
      }, 30000);
    };

    io.on("connect", () => console.log("✅ Socket connected"));
    io.on("disconnect", () => console.log("❌ Socket disconnected"));
    io.on("incoming-call", handleIncomingCall);
  
    return () => {
      io.off("incoming-call", handleIncomingCall);
    };
  }, []); // Run only once on mount

  const handleAcceptCall = () => {
    setShowCallPopup(false);
    document.querySelectorAll('audio').forEach(audio => audio.pause());
    socket?.emit("call-accepted", incomingCall.callId);
  };

  const handleRejectCall = () => {
    setShowCallPopup(false);
    document.querySelectorAll('audio').forEach(audio => audio.pause());
    socket?.emit("call-rejected", incomingCall.callId);
  };

  return (
    <CallContext.Provider value={{
      socket,
      setSocket,
      incomingCall,
      showCallPopup,
      handleAcceptCall,
      handleRejectCall
    }}>
      {children}
    </CallContext.Provider>
  );
};
