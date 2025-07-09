


import { useState } from "react";
import BrandSection from "../sections/BrandSection";
import ModelSection from "../sections/ModelSection";
import VariantSection from "../sections/VariantSection";

export default function ManagerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Manager Dashboard</h1>
      <BrandSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
      <ModelSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
      <VariantSection canEdit={false} showCreate={true} refreshKey={refreshKey} onCreated={triggerRefresh} />
    </div>
  );
}
