// src/api/auth.js
import axios from "./axios";

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const res = await axios.post("/auth/refresh", { refresh_token });
  return res.data.access_token;
};
