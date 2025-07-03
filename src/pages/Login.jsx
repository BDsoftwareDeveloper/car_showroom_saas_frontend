import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function Login({ onLogin = () => {} }) {
  const [email, setEmail] = useState("admin@carshowroom.com");
  const [password, setPassword] = useState("supersecurepassword");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access_token, user } = res.data;

      // Decode token for expiry
      const decoded = jwt_decode(access_token);
      const expiresInMs = decoded.exp * 1000 - Date.now();

      // Store session/token info
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", access_token);
      storage.setItem("user", JSON.stringify(user)); // Store full user object

      // Session expiry handler
      setTimeout(() => {
        storage.clear();
        alert("Session expired. Please log in again.");
        window.location.reload();
      }, expiresInMs);

      // Call parent if any
      onLogin(user);

      // Navigate based on role
      if (user.is_superadmin) {
        navigate("/superadmin");
      } else {
        navigate(`/${user.role}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />{" "}
          Remember me
        </label>
      </div>

      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </button>
    </div>
  );
}
