
import axios from "axios";

const lawyerRegisterApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default lawyerRegisterApi;
