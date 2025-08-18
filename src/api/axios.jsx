// // src/api/axios.js
// import axios from "axios";
// import { API_URL } from "./constants";

// // 🔍 Extract subdomain from current hostname
// const getTenantSubdomain = () => {
//   const host = window.location.hostname;
//   const parts = host.split(".");
//   if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return "local";
//   return parts.length >= 2 ? parts[0] : "default";
// };

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

//     const isPublic =
//       config.url?.startsWith("/public") || config.url?.includes("/public/");
//     const isGlobal =
//       config.url?.startsWith("/car-brands") ||
//       config.url?.startsWith("/car-models") ||
//       config.url?.startsWith("/car-variants");

//     // 🔐 Attach token for non-public routes
//     if (!isPublic && token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 🌐 Inject subdomain only for tenant-specific routes
//     if (!isGlobal) {
//       const subdomain = getTenantSubdomain();
//       config.params = {
//         ...(config.params || {}),
//         subdomain: config.params?.subdomain ?? subdomain,
//       };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401) {
//       localStorage.clear();
//       sessionStorage.clear();
//       window.location.href = "/login";
//     }

//     if (status === 500) {
//       console.error("💥 Server error:", error.response?.data || error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;





// src/api/axios.js
// import axios from "axios";
// import { API_URL } from "./constants";

// // 🔍 Extract tenant subdomain from current hostname
// const getTenantSubdomain = () => {
//   const host = window.location.hostname;
//   const parts = host.split(".");
//   // localhost or IP address -> default tenant
//   if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return "default";
//   // For local development like speedauto.local
//   if (host.endsWith(".local") && parts.length >= 2) return parts[0];
//   // Normal subdomain like tenant.example.com
//   if (parts.length >= 3) return parts[0];
//   return "default";
// };

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

//     const isPublic =
//       config.url?.startsWith("/public") || config.url?.includes("/public/");
//     const isGlobal =
//       config.url?.startsWith("/car-brands") ||
//       config.url?.startsWith("/car-models") ||
//       config.url?.startsWith("/car-variants");

//     // 🔐 Attach token only for protected routes
//     if (!isPublic && token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 🌐 Inject tenant subdomain for tenant-specific routes
//     if (!isGlobal) {
//       const subdomain = getTenantSubdomain();
//       config.params = {
//         ...(config.params || {}),
//         subdomain: config.params?.subdomain ?? subdomain,
//       };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const isPublic = error.config.url?.startsWith("/public");

//     // Only redirect to login for protected routes
//     if (status === 401 && !isPublic) {
//       localStorage.clear();
//       sessionStorage.clear();
//       window.location.href = "/login";
//     }

//     if (status === 500) {
//       console.error("💥 Server error:", error.response?.data || error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



// src/api/axios.js
// import axios from "axios";
// import { API_URL } from "./constants";

// // 🔍 Extract subdomain from current hostname
// const getTenantSubdomain = () => {
//   const host = window.location.hostname;
//   const parts = host.split(".");
//   if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return "default";
//   return parts.length >= 2 ? parts[0] : "default";
// };

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

//     const isPublic =
//       config.url?.startsWith("/public") || config.url?.includes("/public/");
//     const isGlobal =
//       config.url?.startsWith("/car-brands") ||
//       config.url?.startsWith("/car-models") ||
//       config.url?.startsWith("/car-variants");

//     // 🔐 Attach token for non-public routes
//     if (!isPublic && token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 🌐 Inject subdomain only if not already provided and if tenant-specific
//     if (!isGlobal) {
//       config.params = config.params || {};
//       if (!config.params.subdomain) {
//         config.params.subdomain = getTenantSubdomain();
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401) {
//       localStorage.clear();
//       sessionStorage.clear();
//       window.location.href = "/login";
//     }

//     if (status === 403) {
//       console.error("🚫 Forbidden: You do not have permission to access this resource.");
//     }

//     if (status === 500) {
//       console.error("💥 Server error:", error.response?.data || error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from "axios";
import { API_URL } from "./constants";
import { getTenantSubdomain } from "../utils/tenant";

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

    // 🌐 Inject tenant subdomain for tenant-specific routes
    if (!isGlobal) {
      config.params = config.params || {};
      if (!config.params.subdomain) {
        config.params.subdomain = getTenantSubdomain();
      }
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

    if (status === 403) {
      console.error("🚫 Forbidden: You do not have permission to access this resource.");
    }

    if (status === 500) {
      console.error("💥 Server error:", error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
