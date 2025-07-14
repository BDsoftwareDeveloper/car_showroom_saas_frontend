// src/api/axios.js
import axios from "axios";

// Extract subdomain (e.g., speedauto from speedauto.localhost)
const getTenantSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");
  return parts.length >= 2 ? parts[0] : "default";
};

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Use VITE_API_BASE_URL in prod
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

    // Check if the request is for a public route
    const isPublic = config.url?.startsWith("/public") || config.url?.includes("/public/");

    // Add Authorization header only for non-public routes
    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Inject subdomain if not already set
    const subdomain = getTenantSubdomain();
    config.params = {
      ...(config.params || {}),
      subdomain: config.params?.subdomain ?? subdomain,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
