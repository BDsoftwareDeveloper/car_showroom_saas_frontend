// import axios from "axios";

// // Create the axios instance
// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // Change to your actual API base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to include token
// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optional: Response interceptor for global error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // You can show a toast, redirect on 401, log, etc.
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized. Redirect to login.");
//       // Example: window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";

// // Dynamically extract subdomain from the browser's hostname
// const getTenantSubdomain = () => {
//   const host = window.location.hostname; // e.g., speedauto.local
//   const parts = host.split(".");
//   if (parts.length >= 2) {
//     return parts[0]; // Extract "speedauto"
//   }
//   return null;
// };

// // Create the axios instance
// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // Adjust if deployed
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to include token and tenant subdomain
// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Inject tenant subdomain as a query parameter
//     const subdomain = getTenantSubdomain();
//     if (subdomain) {
//       config.params = {
//         ...(config.params || {}),
//         tenant_subdomain: subdomain,
//       };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Response interceptor for global error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized. Redirect to login.");
//       // Optionally redirect:
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;




// src/api/axios.js
import axios from "axios";

// Extract subdomain from window host (e.g., speedauto.localhost or speedauto.example.com)
const getTenantSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length >= 2) {
    return parts[0];
  }
  return null;
};

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Change this in production
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include Bearer token and tenant subdomain
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add tenant_subdomain as query param
    const subdomain = getTenantSubdomain();
    if (subdomain) {
      config.params = {
        ...(config.params || {}),
        tenant_subdomain: subdomain,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("Unauthorized — redirecting to login.");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
