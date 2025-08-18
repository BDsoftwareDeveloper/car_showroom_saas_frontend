import { Navigate, useLocation } from "react-router-dom";

/**
 * Redirects authenticated users away from public routes like login
 */
export default function PublicRoute({ children }) {
  const token =
    localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
  );
  const location = useLocation();

  if (token && user) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.is_superadmin
      ? "/superadmin"
      : user.role === "admin"
      ? "/admin"
      : `/${user.role}`;
      
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
}
