import axios from "./axios";
import { toast } from "react-toastify";

export const getRequest = async (url, showToast = false) => {
  const res = await axios.get(url);
  if (showToast) toast.success("Data loaded successfully!");
  return res.data;
};

export const postRequest = async (url, data, showToast = false) => {
  const res = await axios.post(url, data);
  if (showToast) toast.success("Successfully created!");
  return res.data;
};

export const putRequest = async (url, data, showToast = false) => {
  const res = await axios.put(url, data);
  if (showToast) toast.success("Successfully updated!");
  return res.data;
};

export const deleteRequest = async (url, showToast = false) => {
  const res = await axios.delete(url);
  if (showToast) toast.success("Deleted successfully!");
  return res.data;
};
