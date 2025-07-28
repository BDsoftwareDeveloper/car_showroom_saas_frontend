// import { useEffect, useState } from "react";
// import AdminUserManagement from "../admin/AdminUserManagement";
// import AdminCarManagement from "../admin/AdminCarManagement";
// import AdminContactMessages from "../admin/AdminContactMessages";
// import AdminFrontpageSettings from "../admin/AdminFrontpageSettings";
// import AdminBookingManagement from "../admin/AdminBookingManagement"; // ✅ New import
// import LogoutButton from "../common/LogoutButton";

// // Optional stub component
// function SalesManagement() {
//   return (
//     <div>
//       <h2>Sales Management</h2>
//       <p>Sales features coming soon...</p>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("users");
//   const [tenant, setTenant] = useState(null);

//   useEffect(() => {
//     const storedTenant = localStorage.getItem("tenant_subdomain");
//     if (storedTenant) setTenant(storedTenant);
//   }, []);

//   const tabs = [
//     { key: "users", label: "User Management", component: <AdminUserManagement /> },
//     { key: "cars", label: "Car Management", component: <AdminCarManagement /> },
//     { key: "sales", label: "Sales Management", component: <SalesManagement /> },
//     { key: "messages", label: "Contact Messages", component: <AdminContactMessages /> },
//     { key: "frontpage", label: "Frontpage Settings", component: <AdminFrontpageSettings /> },
//     {
//       key: "bookings",
//       label: "Booking Management",
//       component: tenant ? <AdminBookingManagement tenant={tenant} /> : <p>Loading tenant info...</p>, // ✅ Pass tenant
//     },
//   ];

//   const currentTab = tabs.find((tab) => tab.key === activeTab);

//   return (
//     <div style={{ padding: "20px" }}>
//       <LogoutButton />
//       <h1 className="text-2xl font-bold mb-6">👩‍💼 Admin Dashboard</h1>

//       {/* Tab Buttons */}
//       <div style={{ marginBottom: 20 }}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             style={{
//               marginRight: 10,
//               background: activeTab === tab.key ? "#1976d2" : "#eee",
//               color: activeTab === tab.key ? "#fff" : "#000",
//               border: "1px solid #1976d2",
//               padding: "6px 16px",
//               borderRadius: 4,
//               cursor: "pointer",
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div style={{ marginTop: 20 }}>
//         {currentTab?.component || <p>Invalid tab selected.</p>}
//       </div>
//     </div>
//   );
// }


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

  // Store tenant info: you might want tenant subdomain or tenant ID depending on your API
  const [tenantSubdomain, setTenantSubdomain] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    // Try to parse the full user object from localStorage/sessionStorage
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null;

    if (storedUser) {
      // You can store tenant subdomain or tenant ID based on your backend design
      setTenantSubdomain(storedUser.tenant_subdomain || null); // if your user stores tenant_subdomain
      setTenantId(storedUser.tenant_id || null); // tenant ID is often more reliable
    }
  }, []);

  // Decide what tenant info you want to pass down — here using tenantId
  const tenant = tenantId;

  const tabs = [
    { key: "users", label: "User Management", component: <AdminUserManagement /> },
    {
      key: "cars",
      label: "Car Management",
      component: tenant ? <AdminCarManagement tenant={tenant} /> : <p>Loading tenant info...</p>,
    },
    { key: "sales", label: "Sales Management", component: <SalesManagement /> },
    { key: "messages", label: "Contact Messages", component: <AdminContactMessages /> },
    { key: "frontpage", label: "Frontpage Settings", component: <AdminFrontpageSettings /> },
    {
      key: "bookings",
      label: "Booking Management",
      component: tenant ? <AdminBookingManagement tenant={tenant} /> : <p>Loading tenant info...</p>,
    },
  ];

  const currentTab = tabs.find((tab) => tab.key === activeTab);

  return (
    <div style={{ padding: "20px" }}>
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-6">👩‍💼 Admin Dashboard</h1>

      {/* Tab Buttons */}
      <div style={{ marginBottom: 20 }}>
        {tabs.map((tab) => {
          const isDisabled = !tenant && (tab.key === "cars" || tab.key === "bookings");
          return (
            <button
              key={tab.key}
              onClick={() => !isDisabled && setActiveTab(tab.key)}
              disabled={isDisabled}
              style={{
                marginRight: 10,
                background: activeTab === tab.key ? "#1976d2" : "#eee",
                color: activeTab === tab.key ? "#fff" : "#000",
                border: "1px solid #1976d2",
                padding: "6px 16px",
                borderRadius: 4,
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 20 }}>
        {currentTab?.component || <p>Invalid tab selected.</p>}
      </div>
    </div>
  );
}
