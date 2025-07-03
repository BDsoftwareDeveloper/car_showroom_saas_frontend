import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SuperadminDashboard from "../components/dashboard/SuperAdminDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import StaffDashboard from "../components/dashboard/StaffDashboard";
import ManagerDashboard from "../components/dashboard/ManagerDashboard";
import SalesDashboard from "../components/dashboard/SalesDashboard";
import PublicDashboard from "../pages/PublicDashboard"; // Fallback for anonymous or unsupported roles

const RoleRouter = () => {
  const [role, setRole] = useState(null);
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") || sessionStorage.getItem("role");
    const isSuper = localStorage.getItem("is_superadmin") === "true" || sessionStorage.getItem("is_superadmin") === "true";

    setRole(savedRole);
    setIsSuperadmin(isSuper);
  }, []);

  if (!role && !isSuperadmin) {
    return <Navigate to="/" replace />; // redirect to login/public
  }

  if (isSuperadmin) return <SuperadminDashboard />;
  if (role === "admin") return <AdminDashboard />;
  if (role === "staff") return <StaffDashboard />;
  if (role === "manager") return <ManagerDashboard />;
  if (role === "sales") return <SalesDashboard />;

  return <PublicDashboard />;
};

export default RoleRouter;
