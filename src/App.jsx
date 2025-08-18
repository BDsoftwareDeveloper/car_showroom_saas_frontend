// // src/App.jsx
// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import PublicLandingPage from "./pages/PublicLandingPage";
// import CarDetailsPage from "./pages/CarDetailsPage";
// import BookNow from "./pages/BookNow";
// import NotifyMe from "./pages/NotifyMe";

// import SuperadminDashboard from "./components/dashboard/SuperAdminDashboard";
// import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
// import StaffDashboard from "./components/dashboard/StaffDashboard";
// import ManagerDashboard from "./components/dashboard/ManagerDashboard";
// import SalesDashboard from "./components/dashboard/SalesDashboard";

// import PrivateRoute from "./routes/PrivateRoute";

// function App() {
//   useEffect(() => {
//     const getTenantSubdomain = () => {
//       const host = window.location.hostname;
//       const parts = host.split(".");
//       if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
//         return "default";
//       }
//       return parts[0]; // Extract subdomain like "speedauto" from "speedauto.local"
//     };

//     const subdomain = getTenantSubdomain();
//     localStorage.setItem("tenant_subdomain", subdomain);
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<PublicLandingPage />} />
//         <Route path="/car/:car_id" element={<CarDetailsPage />} />
//         <Route path="/book-now" element={<BookNow />} />
//         <Route path="/notify" element={<NotifyMe />} />
//         <Route path="/login" element={<Login />} />

//         {/* Role-based Protected Routes */}
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/superadmin"
//           element={
//             <PrivateRoute allowedRoles={["superadmin"]}>
//               <SuperadminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/staff"
//           element={
//             <PrivateRoute allowedRoles={["staff"]}>
//               <StaffDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/manager"
//           element={
//             <PrivateRoute allowedRoles={["manager"]}>
//               <ManagerDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/sales"
//           element={
//             <PrivateRoute allowedRoles={["sales"]}>
//               <SalesDashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import PublicLandingPage from "./pages/PublicLandingPage";
// import CarDetailsPage from "./pages/CarDetailsPage";
// import BookNow from "./pages/BookNow";
// import NotifyMe from "./pages/NotifyMe";

// import SuperadminDashboard from "./components/dashboard/SuperAdminDashboard";
// import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
// import StaffDashboard from "./components/dashboard/StaffDashboard";
// import ManagerDashboard from "./components/dashboard/ManagerDashboard";
// import SalesDashboard from "./components/dashboard/SalesDashboard";

// import PrivateRoute from "./routes/PrivateRoute";

// function App() {
//   useEffect(() => {
//     // Save tenant subdomain
//     const getTenantSubdomain = () => {
//       const host = window.location.hostname;
//       const parts = host.split(".");
//       if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
//         return "default";
//       }
//       return parts[0]; // e.g. speedauto.local → speedauto
//     };
//     localStorage.setItem("tenant_subdomain", getTenantSubdomain());
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute allowedRoles={[]}>
//               <PublicLandingPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/car/:car_id"
//           element={
//             <PrivateRoute allowedRoles={[]}>
//               <CarDetailsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/book-now"
//           element={
//             <PrivateRoute allowedRoles={[]}>
//               <BookNow />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/notify"
//           element={
//             <PrivateRoute allowedRoles={[]}>
//               <NotifyMe />
//             </PrivateRoute>
//           }
//         />

//         {/* Login */}
//         <Route path="/login" element={<Login />} />

//         {/* Protected Role-based Routes */}
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/superadmin"
//           element={
//             <PrivateRoute allowedRoles={["superadmin"]}>
//               <SuperadminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/staff"
//           element={
//             <PrivateRoute allowedRoles={["staff"]}>
//               <StaffDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/manager"
//           element={
//             <PrivateRoute allowedRoles={["manager"]}>
//               <ManagerDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/sales"
//           element={
//             <PrivateRoute allowedRoles={["sales"]}>
//               <SalesDashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PublicLandingPage from "./pages/public/PublicLandingPage";
import CarDetailsPage from "./pages/public/CarDetailsPage";
import BookNow from "./pages/BookNow";
import NotifyMe from "./pages/NotifyMe";

import SuperadminDashboard from "./components/dashboard/SuperAdminDashboard";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import StaffDashboard from "./components/dashboard/StaffDashboard";
import ManagerDashboard from "./components/dashboard/ManagerDashboard";
import SalesDashboard from "./components/dashboard/SalesDashboard";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  useEffect(() => {
    // Store tenant subdomain for API usage
    const host = window.location.hostname;
    const parts = host.split(".");
    const subdomain =
      host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)
        ? "default"
        : parts[0];
    localStorage.setItem("tenant_subdomain", subdomain);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/car/:carId" element={<CarDetailsPage />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/notify" element={<NotifyMe />} />
        <Route path="/login" element={<Login />} />

        {/* ---------- Protected Routes (PrivateRoute) ---------- */}
        <Route
          path="/superadmin"
          element={
            <PrivateRoute allowedRoles={["superadmin"]}>
              <SuperadminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute allowedRoles={["sales"]}>
              <SalesDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
