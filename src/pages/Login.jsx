import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function Login({ onLogin = () => {} }) {
  const [email, setEmail] = useState("admin@carshowroom.com");
  const [password, setPassword] = useState("supersecurepassword");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
    const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");

    if (token && user) {
      const path = user.is_superadmin ? "/superadmin" : `/${user.role}`;
      navigate(path);
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

      setTimeout(() => {
        storage.clear();
        alert("Session expired. Please log in again.");
        navigate("/login");
      }, expiresInMs);

      onLogin(user);
      navigate(user.is_superadmin ? "/superadmin" : `/${user.role}`);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
