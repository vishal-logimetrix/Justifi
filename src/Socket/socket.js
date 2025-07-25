// import { io } from "socket.io-client";

// let socket = null;
// const SOCKET_URL = import.meta.env.VITE_API_SOCKET || "http://192.168.1.43:5001";

// export const connectSocket = (token = null) => {
//   if (!socket) {
//     const options = {
//       autoConnect: true,
//     };

//     if (token) {
//       options.auth = { token };
//     }

//     socket = io(SOCKET_URL, options);
//   }
//   return socket;
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// export const getSocket = () => socket;

// export const isSocketConnected = () => {
//   return socket && socket.connected;
// };