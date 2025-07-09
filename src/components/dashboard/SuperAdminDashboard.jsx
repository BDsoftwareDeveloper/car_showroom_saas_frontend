// import { useState } from "react";
// import UserManagement from "../superadmin/UserManagement";
// import GlobalSettings from "../superadmin/GlobalSettings";
// import TenantManagement from "../superadmin/TenantManagement";
// import Login from "../pages/Login";

// export default function SuperAdminDashboard() {
//   const [activeTab, setActiveTab] = useState("users"); // "users" or "settings" or "tenants"

//   return (
//     <div style={{ padding: 20 }}>
//       <button
//         onClick={() => {
//           localStorage.clear();
//           sessionStorage.clear();
//           // window.location.reload();
//           window.location.href = "/login";  // Redirect to login page
//         }}
//         style={{ float: "right", marginBottom: 10, background: "#eee", border: "1px solid #ccc", padding: "6px 16px" }}
//       >
//         Logout
//       </button>
//       <h2>Superadmin Dashboard</h2>

//       {/* Tab Buttons */}
//       <div style={{ marginBottom: 20 }}>
//         <button
//           onClick={() => setActiveTab("users")}
//           style={{
//             marginRight: 10,
//             background: activeTab === "users" ? "#1976d2" : "#eee",
//             color: activeTab === "users" ? "#fff" : "#000",
//             border: "1px solid #1976d2",
//             padding: "6px 16px",
//             borderRadius: 4,
//           }}
//         >
//           User Management
//         </button>
//         <button
//           onClick={() => setActiveTab("settings")}
//           style={{
//             background: activeTab === "settings" ? "#1976d2" : "#eee",
//             color: activeTab === "settings" ? "#fff" : "#000",
//             border: "1px solid #1976d2",
//             padding: "6px 16px",
//             borderRadius: 4,
//           }}
//         >
//           Global Settings
//         </button>
//         <button
//           onClick={() => setActiveTab("tenants")}
//           style={{
//             background: activeTab === "tenants" ? "#1976d2" : "#eee",
//             color: activeTab === "tenants" ? "#fff" : "#000",
//             border: "1px solid #1976d2",
//             padding: "6px 16px",
//             borderRadius: 4,
//             marginLeft: 10,
//           }}
//         >
//           Tenant Management
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "users" && <UserManagement />}
//       {activeTab === "settings" && <GlobalSettings />}
//       {activeTab === "tenants" && <TenantManagement />}
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import UserManagement from "../superadmin/UserManagement";
import GlobalSettings from "../superadmin/GlobalSettings";
import TenantManagement from "../superadmin/TenantManagement";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("users"); // "users" or "settings" or "tenants"
  const navigate = useNavigate(); // hook to navigate programmatically

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login"); // redirect to login page after logout
  };

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={handleLogout}
        style={{ float: "right", marginBottom: 10, background: "#eee", border: "1px solid #ccc", padding: "6px 16px" }}
      >
        Logout
      </button>
      <h2>Superadmin Dashboard</h2>

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
          onClick={() => setActiveTab("settings")}
          style={{
            background: activeTab === "settings" ? "#1976d2" : "#eee",
            color: activeTab === "settings" ? "#fff" : "#000",
            border: "1px solid #1976d2",
            padding: "6px 16px",
            borderRadius: 4,
          }}
        >
          Global Settings
        </button>
        <button
          onClick={() => setActiveTab("tenants")}
          style={{
            background: activeTab === "tenants" ? "#1976d2" : "#eee",
            color: activeTab === "tenants" ? "#fff" : "#000",
            border: "1px solid #1976d2",
            padding: "6px 16px",
            borderRadius: 4,
            marginLeft: 10,
          }}
        >
          Tenant Management
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "users" && <UserManagement />}
      {activeTab === "settings" && <GlobalSettings />}
      {activeTab === "tenants" && <TenantManagement />}
    </div>
  );
}
