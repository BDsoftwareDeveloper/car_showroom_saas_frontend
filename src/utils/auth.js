import axios from "../api/axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

export const loginUser = async (email, password) => {
  const res = await axios.post("/auth/login", { email, password });
  const { access_token, user } = res.data;
  const decoded = jwt_decode(access_token);
  const expiresInMs = decoded.exp * 1000 - Date.now();

  return { access_token, user, decoded, expiresInMs };
};

export const storeSession = (token, user, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("admin_token", token);
  storage.setItem("user", JSON.stringify(user));
};

export const getStoredToken = () =>
  localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

export const getStoredUser = () => {
  const user =
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null";
  return JSON.parse(user);
};

export const clearSessionAfter = (ms, navigate) => {
  setTimeout(() => {
    localStorage.clear();
    sessionStorage.clear();
    alert("Session expired. Please log in again.");
    navigate("/login");
  }, ms);
};
