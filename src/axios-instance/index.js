import axios from "axios";
import { baseURL } from "./constant";
import { getLoginToken, setLoginToken } from "../storage";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getLoginToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/authentication/login")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           `${baseURL}/authentication/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data.accessToken;
//         setLoginToken(newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch {
//         localStorage.clear();
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ exclude login AND showme from retry
    const noRetryUrls = ["/authentication/login", "/authentication/showme"];

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !noRetryUrls.some((url) => originalRequest.url.includes(url))
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/authentication/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        setLoginToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
