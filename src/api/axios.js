import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utils/token";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong!";
    toast.error(msg);
    return Promise.reject(error);
  }
);

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(config)
      console.log("Request Headers:", config.headers);

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance; 
};

export const axiosMain = createAxiosInstance(import.meta.env.VITE_API_URL);
export const axiosState = createAxiosInstance(import.meta.env.VITE_API_URL_STATE);
export const axiosUser = createAxiosInstance(import.meta.env.VITE_API_URL_USER);
export const axiosAman = createAxiosInstance(import.meta.env.VITE_AMAN_STATE);


export default axiosInstance;
