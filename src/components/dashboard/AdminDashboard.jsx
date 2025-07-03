import { useState } from "react";
import AdminUserManagement from "../admin/AdminUserManagement";
import AdminCarManagement from "../admin/AdminCarManagement"; // <-- Import the new component
import LogoutButton from "../common/LogoutButton";

// Placeholder for sales management
function SalesManagement() {
  return (
    <div>
      <h2>Sales Management</h2>
      <p>Sales features coming soon...</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div style={{ padding: "20px" }}>
      <LogoutButton />
      <h1>👩‍💼 Admin Dashboard</h1>
      {/* Tab Buttons */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            marginRight: 10,
            background: activeTab === "users" ? "#1976d2" : "#eee",
            color: activeTab === "users" ? "#fff" : "#000",
            border: "1px solid #1976d2",
            padding: "6px 16px",
            borderRadius: 4,
          }}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("cars")}
          style={{
            marginRight: 10,
            background: activeTab === "cars" ? "#1976d2" : "#eee",
            color: activeTab === "cars" ? "#fff" : "#000",
            border: "1px solid #1976d2",
            padding: "6px 16px",
            borderRadius: 4,
          }}
        >
          Car Management
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          style={{
            background: activeTab === "sales" ? "#1976d2" : "#eee",
            color: activeTab === "sales" ? "#fff" : "#000",
            border: "1px solid #1976d2",
            padding: "6px 16px",
            borderRadius: 4,
          }}
        >
          Sales Management
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "users" && (
        <AdminUserManagement />
      )}
      {activeTab === "cars" && (
        <AdminCarManagement />
      )}
      {activeTab === "sales" && <SalesManagement />}
    </div>
  );
}
