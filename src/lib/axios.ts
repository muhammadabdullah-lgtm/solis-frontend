import axios from "axios";
import { ApiError } from "./ApiError";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return Promise.reject(
          new ApiError("Network error. Please check your connection.", [], 0),
        );
      }

      const { data, status } = error.response;
      return Promise.reject(
        new ApiError(
          data?.message ?? "Request failed",
          Array.isArray(data?.errors) ? data.errors : [],
          status,
        ),
      );
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
