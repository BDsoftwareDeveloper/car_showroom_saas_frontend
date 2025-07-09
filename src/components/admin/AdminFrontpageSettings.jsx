import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminFrontpageSettings({ tenant }) {
  const [settings, setSettings] = useState({
    site_title: "",
    site_tagline: "",
    site_logo_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/admin/frontpage-settings", {
          params: { tenant_subdomain: tenant },
        });
        setSettings(res.data);
      } catch (err) {
        console.error("Failed to load settings:", err);
        setMessage("❌ Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    if (tenant) fetchSettings();
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.put("/admin/frontpage-settings", settings, {
        params: { tenant_subdomain: tenant },
      });
      setMessage("✅ Settings updated successfully.");
    } catch (err) {
      console.error("Failed to save settings:", err);
      setMessage("❌ Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!tenant) {
    return <div className="p-6 text-red-500">Tenant subdomain is required.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">🛠 Frontpage Settings</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Title</label>
            <input
              type="text"
              name="site_title"
              value={settings.site_title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Site Tagline</label>
            <input
              type="text"
              name="site_tagline"
              value={settings.site_tagline}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input
              type="text"
              name="site_logo_url"
              value={settings.site_logo_url}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {settings.site_logo_url && (
            <div className="mt-2">
              <img
                src={settings.site_logo_url}
                alt="Site Logo Preview"
                className="h-16"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

          {message && (
            <p className="mt-3 text-sm text-gray-700">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}
