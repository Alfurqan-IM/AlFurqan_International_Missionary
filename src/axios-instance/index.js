import axios from "axios";
import { baseURL } from "./constant";
import { getLoginToken } from "../storage";

const config = {
  baseURL,
  withCredentials: true, // 👈 crucial for cookies
};
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLoginToken()}`,
};
export const axiosInstance = axios.create(config);
