import { useEffect, useState } from "react";
import AdminUserManagement from "../admin/AdminUserManagement";
import AdminCarManagement from "../admin/AdminCarManagement";
import AdminContactMessages from "../admin/AdminContactMessages";
import AdminFrontpageSettings from "../admin/AdminFrontpageSettings";
import AdminBookingManagement from "../admin/AdminBookingManagement"; // ✅ New import
import LogoutButton from "../common/LogoutButton";

// Optional stub component
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
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const storedTenant = localStorage.getItem("tenant_subdomain");
    if (storedTenant) setTenant(storedTenant);
  }, []);

  const tabs = [
    { key: "users", label: "User Management", component: <AdminUserManagement /> },
    { key: "cars", label: "Car Management", component: <AdminCarManagement /> },
    { key: "sales", label: "Sales Management", component: <SalesManagement /> },
    { key: "messages", label: "Contact Messages", component: <AdminContactMessages /> },
    { key: "frontpage", label: "Frontpage Settings", component: <AdminFrontpageSettings /> },
    {
      key: "bookings",
      label: "Booking Management",
      component: tenant ? <AdminBookingManagement tenant={tenant} /> : <p>Loading tenant info...</p>, // ✅ Pass tenant
    },
  ];

  const currentTab = tabs.find((tab) => tab.key === activeTab);

  return (
    <div style={{ padding: "20px" }}>
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-6">👩‍💼 Admin Dashboard</h1>

      {/* Tab Buttons */}
      <div style={{ marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: 10,
              background: activeTab === tab.key ? "#1976d2" : "#eee",
              color: activeTab === tab.key ? "#fff" : "#000",
              border: "1px solid #1976d2",
              padding: "6px 16px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 20 }}>
        {currentTab?.component || <p>Invalid tab selected.</p>}
      </div>
    </div>
  );
}
