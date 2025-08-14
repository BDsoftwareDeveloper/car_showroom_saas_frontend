// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");

//   if (!token) {
//     // Not logged in – redirect to login page
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in – render child components
//   return children;
// };

// export default PrivateRoute;


// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user.is_superadmin ? "superadmin" : user.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
