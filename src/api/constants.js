// api/constants.js

const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:8000"; // strip trailing slash
export const API_BASE_URL = base;

export const API_VERSION = "v1";

// e.g. http://localhost:8000/api/v1/
export const API_URL = `${API_BASE_URL}/api/${API_VERSION}/`;
