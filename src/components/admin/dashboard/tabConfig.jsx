// import AdminUserManagement from "../users/AdminUserManagement";
import AdminUserManagement from "../AdminUserManagement";
import AdminCarManagement from "../AdminCarManagement";
// import AdminBookingManagement from "../bookings/AdminBookingManagement";
import AdminBookingManagement from "../bookings/AdminBookingManagement";
// import AdminContactMessages from "../messages/AdminContactMessages";
import AdminContactMessages from "../AdminContactMessages";
// import AdminFrontpageSettings from "../frontpage/AdminFrontpageSettings";
import AdminFrontpageSettings from "../AdminFrontpageSettings";

import SMTPManagement from "../smtp/SMTPManagement"; // New import for SMTP settings

// Optional stub
function SalesManagement() {
  return (
    <div>
      <h2>Sales Management</h2>
      <p>Sales features coming soon...</p>
    </div>
  );
}

export const getAdminTabs = (tenant) => [
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
   {
    key: "smtp",
    label: "SMTP Settings",
    component: <SMTPManagement />,
  },
];
