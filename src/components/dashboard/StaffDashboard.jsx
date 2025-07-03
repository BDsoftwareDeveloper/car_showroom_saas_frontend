// import React, { useState } from "react";
// import PublicBrandList from "../components/PublicBrandList";
// import PublicModelList from "../components/PublicModelList";
// import PublicVariantList from "../components/PublicVariantList";
// import CreateBrand from "../components/CreateBrand";
// import CreateModel from "../components/CreateModel";
// import CreateVariant from "../components/CreateVariant";

// export default function StaffDashboard() {
//   const [refreshKey, setRefreshKey] = useState(0);
//   const triggerRefresh = () => setRefreshKey(prev => prev + 1);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🚘 Staff Dashboard</h1>

//       <section style={{ marginBottom: "40px" }}>
//         <h2>Brands</h2>
//         <CreateBrand onCreated={triggerRefresh} />
//         <PublicBrandList canEdit={false} key={`brand-${refreshKey}`} />
//       </section>

//       <section style={{ marginBottom: "40px" }}>
//         <h2>Models</h2>
//         <CreateModel onCreated={triggerRefresh} />
//         <PublicModelList canEdit={false} key={`model-${refreshKey}`} />
//       </section>

//       <section>
//         <h2>Variants</h2>
//         <CreateVariant onCreated={triggerRefresh} />
//         <PublicVariantList canEdit={false} key={`variant-${refreshKey}`} />
//       </section>
//     </div>
//   );
// }


import { useState } from "react";
import BrandSection from "../sections/BrandSection";
import ModelSection from "../sections/ModelSection";
import VariantSection from "../sections/VariantSection";

export default function StaffDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍🔧 Staff Dashboard</h1>
      <BrandSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
      <ModelSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
      <VariantSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
    </div>
  );
}
