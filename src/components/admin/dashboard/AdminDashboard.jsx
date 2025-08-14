import { useEffect, useState } from "react";
import LogoutButton from "../../public/common/LogoutButton";
import { getAdminTabs } from "./tabConfig";
import TabNavigation from "./TabNavigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [tenantSubdomain, setTenantSubdomain] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null;

    if (storedUser) {
      setTenantSubdomain(storedUser.tenant_subdomain || null);
      setTenantId(storedUser.tenant_id || null);
    }
  }, []);

  const tenant = tenantId;
  const tabs = getAdminTabs(tenant);
  const currentTab = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-8 lg:px-16 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 w-full sm:w-auto">
          👩‍💼 Admin Dashboard
        </h1>
        <LogoutButton className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition w-full sm:w-auto text-center" />
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto mb-8 w-full">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          tenant={tenant}
          className="flex flex-nowrap gap-3 sm:gap-6 w-full"
        />
      </div>

      {/* Tab Content */}
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-5xl space-y-6">
          {currentTab?.component || (
            <p className="text-gray-500 text-center text-lg">
              Invalid tab selected.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
