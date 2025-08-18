// src/routes/PrivateRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";

// /**
//  * Protects routes based on authentication and user role.
//  * 
//  * @param {ReactNode} children - Component(s) to render if authorized
//  * @param {Array<string>} allowedRoles - Roles allowed to access this route
//  */
// export default function PrivateRoute({ children, allowedRoles = [] }) {
//   const token =
//     localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
//   const user = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//   );
//   const location = useLocation();

//   // ---------- Not logged in ----------
//   if (!token || !user) {
//     // Public landing page is accessible
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   // Determine actual user role
//   const userRole = user.is_superadmin ? "superadmin" : user.role;

//   // ---------- Unauthorized for this route ----------
//   if (!allowedRoles.includes(userRole)) {
//     // Redirect to their role dashboard if logged in
//     const redirectPath = user.is_superadmin ? "/superadmin" : `/${user.role}`;
//     return <Navigate to={redirectPath} replace />;
//   }

//   // ---------- Authorized ----------
//   return children;
// }




// import { Navigate, useLocation } from "react-router-dom";

// /**
//  * Protects routes based on authentication and user role.
//  *
//  * - Guests can access public routes like "/"
//  * - Users without the correct role get redirected to "/"
//  */
// export default function PrivateRoute({ children, allowedRoles = [] }) {
//   const token =
//     localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
//   const user = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//   );
//   const location = useLocation();

//   // ---------- If no token and trying to access a protected route ----------
//   if (!token || !user) {
//     if (allowedRoles.length === 0) {
//       // Public route

//       return children; // Allow access to public routes
//     }
//     // Protected route
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   const userRole = user.is_superadmin ? "superadmin" : user.role;

//   // ---------- Unauthorized for this route ----------
//   if (allowedRoles.length && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/" replace />; // Redirect to landing page
//   }

//   // ---------- Authorized ----------
//   return children;
// }




// import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';

// /**
//  * PrivateRoute - Protects routes based on authentication and user roles
//  * 
//  * Features:
//  * - Redirects unauthenticated users to login with return URL
//  * - Redirects unauthorized users to home or specific route
//  * - Handles role-based authorization
//  * - Preserves navigation state
//  */
// export default function PrivateRoute({ children, allowedRoles = [] }) {
//   const token =
//     localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
//   const user = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//   );
//   const location = useLocation();

//   // If no token/user but route doesn't require auth (public route)
//   if (allowedRoles.length === 0) {
//     return children;
//   }

//   // User is not authenticated
//   if (!token || !user) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//         state={{ 
//           from: location,
//           message: "Please login to access this page" 
//         }}
//       />
//     );
//   }

//   const userRole = user.is_superadmin ? "superadmin" : user.role;

//   // User is authenticated but not authorized for this route
//   if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
//     return (
//       <Navigate
//         to={getFallbackRoute(userRole)}
//         replace
//         state={{ 
//           from: location,
//           message: "You don't have permission to access this page" 
//         }}
//       />
//     );
//   }

//   // User is authenticated and authorized
//   return children;
// }

// /**
//  * Determines fallback route based on user role
//  */
// function getFallbackRoute(userRole) {
//   const roleRoutes = {
//     superadmin: "/superadmin",
//     admin: "/admin",
//     staff: "/staff",
//     manager: "/manager",
//     sales: "/sales",
//   };
//   return roleRoutes[userRole] || "/";
// }

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   allowedRoles: PropTypes.arrayOf(PropTypes.string),
// };



// src/routes/PrivateRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";

// /**
//  * Protects routes based on authentication and user role.
//  *
//  * @param {ReactNode} children - The component(s) to render if authorized
//  * @param {Array<string>} allowedRoles - Roles allowed to access this route
//  */
// export default function PrivateRoute({ children, allowedRoles = [] }) {
//   const token =
//     localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
//   const user = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//   );
//   const location = useLocation();

//   // ---------- Public landing page ---------- 
//   // Always allow access to "/"
//   if (location.pathname === "/") {
//     return children;
//   }

//   // ---------- Not logged in ----------
//   if (!token || !user) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // Determine actual user role
//   const userRole = user.is_superadmin ? "superadmin" : user.role;

//   // ---------- Unauthorized for this route ----------
//   if (allowedRoles.length && !allowedRoles.includes(userRole)) {
//     // Redirect to landing page instead of login
//     return <Navigate to="/" replace />;
//   }

//   // ---------- Authorized ----------
//   return children;
// }




// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

/**
 * Protects routes based on authentication and user role.
 * If a route is public (allowedRoles empty), it will allow access to anyone.
 *
 * @param {ReactNode} children - The component(s) to render if authorized
 * @param {Array<string>} allowedRoles - Roles allowed to access this route
 */
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token =
    localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
  );
  const location = useLocation();

  // ---------- Public route (no roles required) ----------
  if (allowedRoles.length === 0) {
    return children;
  }

  // ---------- Not logged in ----------
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ---------- Determine actual user role ----------
  const userRole = user.is_superadmin ? "superadmin" : user.role;

  // ---------- Unauthorized for this route ----------
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect to public landing page
  }

  // ---------- Authorized ----------
  return children;
}
