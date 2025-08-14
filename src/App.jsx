

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import PublicDashboard from "./pages/PublicDashboard";
// import SuperadminDashboard from "./components/dashboard/SuperAdminDashboard";
// // import AdminDashboard from "./components/dashboard/AdminDashboard";
// import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
// import StaffDashboard from "./components/dashboard/StaffDashboard";
// import ManagerDashboard from "./components/dashboard/ManagerDashboard";
// import SalesDashboard from "./components/dashboard/SalesDashboard";
// import PrivateRoute from "./routes/PrivateRoute";

// import CarDetailsPage from './pages/CarDetailsPage';

// import PublicLandingPage from "./pages/PublicLandingPage";

// // import BookNow from "./pages/BookNow";
// import BookNow from "./pages/BookNow";
// import NotifyMe from "./pages/NotifyMe"; // If you have this page

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/car/:car_id" element={<CarDetailsPage />} />
//         <Route path="/" element={<PublicLandingPage />} />

//         <Route path="/book-now" element={<BookNow/>} />
//         <Route path="/notify" element={<NotifyMe />} />
        
//         {/* Public login route */}
//         <Route path="/login" element={<Login />} />

//         {/* Role-based protected routes */}
//         <Route
//           path="/superadmin"
//           element={
//             <PrivateRoute>
//               <SuperadminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute>
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/staff"
//           element={
//             <PrivateRoute>
//               <StaffDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/manager"
//           element={
//             <PrivateRoute>
//               <ManagerDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/sales"
//           element={
//             <PrivateRoute>
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
import PublicLandingPage from "./pages/PublicLandingPage";
import CarDetailsPage from "./pages/CarDetailsPage";
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
    const getTenantSubdomain = () => {
      const host = window.location.hostname;
      const parts = host.split(".");
      if (host.includes("localhost") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        return "default";
      }
      return parts[0]; // Extract subdomain like speedauto from speedauto.local
    };

    const subdomain = getTenantSubdomain();
    localStorage.setItem("tenant_subdomain", subdomain);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/car/:car_id" element={<CarDetailsPage />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/notify" element={<NotifyMe />} />
        <Route path="/login" element={<Login />} />

        {/* Role-based Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/superadmin"
          element={
            <PrivateRoute allowedRoles={["superadmin"]}>
              <SuperadminDashboard />
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




