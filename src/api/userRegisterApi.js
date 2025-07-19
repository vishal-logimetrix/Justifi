// src/api/userRegisterApi.js
import axios from "axios";

const userRegisterApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL_USER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default userRegisterApi;
