// import React, { useEffect, useState } from "react";
// import PublicBrandList from "../components/PublicBrandList";
// import PublicModelList from "../components/PublicModelList";
// import PublicVariantList from "../components/PublicVariantList";
// import CreateBrand from "../components/CreateBrand";
// import CreateModel from "../components/CreateModel";
// import CreateVariant from "../components/CreateVariant";

// export default function AdminDashboard() {
//   const [userRole, setUserRole] = useState("viewer");
//   const [isSuperadmin, setIsSuperadmin] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);

//   useEffect(() => {
//     const role = localStorage.getItem("role") || sessionStorage.getItem("role");
//     const superFlag =
//       localStorage.getItem("is_superadmin") === "true" ||
//       sessionStorage.getItem("is_superadmin") === "true";

//     setUserRole(role);
//     setIsSuperadmin(superFlag);
//   }, []);

//   const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🚘 Admin Dashboard</h1>

//       <section style={{ marginBottom: "40px" }}>
//         <h2>Brands</h2>
//         {["admin", "staff", "sales", "manager", "superadmin"].includes(userRole) && (
//           <CreateBrand onCreated={triggerRefresh} />
//         )}
//         <PublicBrandList canEdit={isSuperadmin} key={`brand-${refreshKey}`} />
//       </section>

//       <section style={{ marginBottom: "40px" }}>
//         <h2>Models</h2>
//         {["admin", "staff", "sales", "manager", "superadmin"].includes(userRole) && (
//           <CreateModel onCreated={triggerRefresh} />
//         )}
//         <PublicModelList canEdit={isSuperadmin} key={`model-${refreshKey}`} />
//       </section>

//       <section>
//         <h2>Variants</h2>
//         {["admin", "staff", "sales", "manager", "superadmin"].includes(userRole) && (
//           <CreateVariant onCreated={triggerRefresh} />
//         )}
//         <PublicVariantList canEdit={isSuperadmin} key={`variant-${refreshKey}`} />
//       </section>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import PublicBrandList from "../components/brand/PublicBrandList";
import PublicModelList from "../components/model/PublicModelList";
import PublicVariantList from "../components/variant/PublicVariantList";
import CreateBrand from "../components/brand/CreateBrand";
import CreateModel from "../components/model/CreateModel";
import CreateVariant from "../components/variant/CreateVariant";

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState("viewer");
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role") || sessionStorage.getItem("role") || "viewer";
    const superFlag =
      localStorage.getItem("is_superadmin") === "true" ||
      sessionStorage.getItem("is_superadmin") === "true";

    setUserRole(role);
    setIsSuperadmin(superFlag);
  }, []);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const canCreate = ["admin", "staff", "sales", "manager", "superadmin"].includes(userRole);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚘 Admin Dashboard</h1>

      {/* Brands Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Brands</h2>
        {canCreate && <CreateBrand onCreated={triggerRefresh} />}
        <PublicBrandList canEdit={isSuperadmin} key={`brand-${refreshKey}`} />
      </section>

      {/* Models Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Models</h2>
        {canCreate && <CreateModel onCreated={triggerRefresh} />}
        <PublicModelList canEdit={isSuperadmin} key={`model-${refreshKey}`} />
      </section>

      {/* Variants Section */}
      <section>
        <h2>Variants</h2>
        {canCreate && <CreateVariant onCreated={triggerRefresh} />}
        <PublicVariantList canEdit={isSuperadmin} key={`variant-${refreshKey}`} />
      </section>
    </div>
  );
}
