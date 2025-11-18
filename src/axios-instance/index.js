import axios from "axios";
import { baseURL } from "./constant";
import { getLoginToken } from "../storage";

const config = {
  baseURL,
  withCredentials: true, // 👈 crucial for cookies
};
export const axiosInstance = axios.create(config);
axiosInstance.interceptors.request.use((config) => {
  const token = getLoginToken(); // from localStorage or sessionStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // rely on cookies
  }

  return config;
});

// axios.defaults.headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${getLoginToken()}`,
// };
// axios.defaults.withCredentials = true;
