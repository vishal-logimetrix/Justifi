// src/Socket/socket.js
import { io } from "socket.io-client";

let socket = null;
const SOCKET_URL = import.meta.env.VITE_API_SOCKET || "http://192.168.1.43:5001";

export const connectSocket = (token = null) => {
  if (!socket) {
    const options = {
      autoConnect: true,
      // autoConnect: false,    avoid retry
    };

    if (token) {
      options.auth = { token };
    }

    socket = io(SOCKET_URL, options);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

// Additional helper to check connection status
export const isSocketConnected = () => {
  return socket && socket.connected;
};