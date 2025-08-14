import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8000/global-models", // change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Unauthorized! Please login again.");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } else if (status === 422) {
      toast.error("Validation error: Please check your input.");
      console.error("Validation error:", error.response.data);
    } else if (status === 404) {
      toast.warning("Resource not found.");
    } else if (status === 500) {
      toast.error("Server error! Please try again later.");
      console.error("Server error:", error.response.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
