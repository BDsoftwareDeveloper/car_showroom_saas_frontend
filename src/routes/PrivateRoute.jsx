import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    // Not logged in – redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in – render child components
  return children;
};

export default PrivateRoute;
