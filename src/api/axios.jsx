// src/api/axios.js
import axios from "axios";
import { API_URL } from "./constants";

// 🔍 Extract subdomain from current hostname
const getTenantSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return "local";
  return parts.length >= 2 ? parts[0] : "default";
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

    const isPublic =
      config.url?.startsWith("/public") || config.url?.includes("/public/");
    const isGlobal =
      config.url?.startsWith("/car-brands") ||
      config.url?.startsWith("/car-models") ||
      config.url?.startsWith("/car-variants");

    // 🔐 Attach token for non-public routes
    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🌐 Inject subdomain only for tenant-specific routes
    if (!isGlobal) {
      const subdomain = getTenantSubdomain();
      config.params = {
        ...(config.params || {}),
        subdomain: config.params?.subdomain ?? subdomain,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }

    if (status === 500) {
      console.error("💥 Server error:", error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

