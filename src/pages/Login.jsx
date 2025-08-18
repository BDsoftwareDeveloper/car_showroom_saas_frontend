

// import { useState, useEffect } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode as jwt_decode } from "jwt-decode";

// export default function Login({ onLogin = () => {} }) {
//   const [email, setEmail] = useState("admin@carshowroom.com");
//   const [password, setPassword] = useState("supersecurepassword");
//   const [rememberMe, setRememberMe] = useState(true);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const getRedirectPath = (user) => {
//     if (user.is_superadmin) return "/superadmin";
//     const roleMap = {
//       admin: "/admin",
//       staff: "/staff",
//       manager: "/manager",
//       sales: "/sales",
//     };
//     return roleMap[user.role] || "/";
//   };

//   useEffect(() => {
//     const token =
//       localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
//     const user = JSON.parse(
//       localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//     );

//     if (token && user) {
//       navigate(getRedirectPath(user));
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post("/auth/login", { email, password });
//       const { access_token, user } = res.data;

//       const decoded = jwt_decode(access_token);
//       const expiresInMs = decoded.exp * 1000 - Date.now();

//       const storage = rememberMe ? localStorage : sessionStorage;
//       storage.setItem("admin_token", access_token);
//       storage.setItem("user", JSON.stringify(user));

//       // Expire session
//       setTimeout(() => {
//         storage.removeItem("admin_token");
//         storage.removeItem("user");
//         alert("Session expired. Please log in again.");
//         navigate("/login");
//       }, expiresInMs);

//       onLogin(user);
//       navigate(getRedirectPath(user));
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.response?.data?.detail || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md p-8 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Login</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//               autoComplete="email"
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//               autoComplete="current-password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//                 className="mr-2"
//               />
//               <span className="text-sm text-gray-700">Remember me</span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function Login({ onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Remove default credentials for security
  const roleRedirectPaths = {
    superadmin: "/superadmin",
    admin: "/admin",
    staff: "/staff",
    manager: "/manager",
    sales: "/sales",
  };

  const getRedirectPath = (user) => {
    // Check for redirect state (from protected routes)
    const from = location.state?.from?.pathname || "/";
    
    // If coming from a protected route and has permission, return there
    if (from !== "/" && from !== "/login") {
      const requiredRole = Object.entries(roleRedirectPaths).find(
        ([_, path]) => from.startsWith(path)
      )?.[0];
      
      if (!requiredRole || user.is_superadmin || user.role === requiredRole) {
        return from;
      }
    }
    
    // Default role-based redirect
    return user.is_superadmin 
      ? "/superadmin" 
      : roleRedirectPaths[user.role] || "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
    const user = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
    );

    if (token && user) {
      navigate(getRedirectPath(user), { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access_token, user } = res.data;

      const decoded = jwt_decode(access_token);
      const expiresInMs = decoded.exp * 1000 - Date.now();

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("admin_token", access_token);
      storage.setItem("user", JSON.stringify(user));

      // Set auto-logout timer
      const logoutTimer = setTimeout(() => {
        storage.removeItem("admin_token");
        storage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        navigate("/login", { state: { sessionExpired: true } });
      }, expiresInMs);

      // Store timer ID to clear if user logs out manually
      storage.setItem("logoutTimerId", logoutTimer.toString());

      onLogin(user);
      navigate(getRedirectPath(user), { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Show session expired message if redirected due to timeout
  useEffect(() => {
    if (location.state?.sessionExpired) {
      setError("Your session has expired. Please log in again.");
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Admin Portal Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}