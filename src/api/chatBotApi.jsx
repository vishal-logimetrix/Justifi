
import axios from "axios";

const chatBotApi = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_PORT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default chatBotApi;
