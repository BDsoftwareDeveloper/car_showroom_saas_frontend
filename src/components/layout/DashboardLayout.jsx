// src/components/DashboardLayout.jsx
import React from "react";

export default function DashboardLayout({ children, title, onLogout }) {
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>{title || "Dashboard"}</h1>
        {onLogout && (
          <button onClick={onLogout} style={{ float: "right" }}>
            Logout
          </button>
        )}
      </header>

      <main>{children}</main>

      <footer style={{ marginTop: 40, textAlign: "center", color: "#666" }}>
        <p>© 2025 Car Showroom SaaS</p>
      </footer>
    </div>
  );
}
