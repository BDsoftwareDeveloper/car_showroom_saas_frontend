import { useEffect, useState } from "react";
import axios from "../../api/axios";

const fieldRowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
};
const labelStyle = {
  minWidth: 120,
  fontWeight: "bold",
  marginRight: 8,
};

export default function TenantManagement() {
  const [tenant, setTenant] = useState(null);
  const [tenantFields, setTenantFields] = useState({
    name: "",
    domain: "",
  });

  // Fetch only the current tenant's info
  const fetchTenant = async () => {
    try {
      const res = await axios.get("/tenants/me"); // Adjust endpoint as needed
      setTenant(res.data);
      setTenantFields({
        name: res.data.name || "",
        domain: res.data.domain || "",
      });
    } catch (err) {
      console.error("Error fetching tenant", err);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, []);

  const handleTenantFieldChange = (e) => {
    setTenantFields({ ...tenantFields, [e.target.name]: e.target.value });
  };

  const handleTenantUpdate = async () => {
    if (!tenant) return;
    try {
      await axios.put(`/tenants/${tenant.id}`, tenantFields);
      alert("Tenant updated!");
      fetchTenant();
    } catch (err) {
      console.error("Error updating tenant", err);
    }
  };

  const handleTenantDelete = async () => {
    if (!tenant || !window.confirm("Are you sure you want to delete your tenant?")) return;
    try {
      await axios.delete(`/tenants/${tenant.id}`);
      alert("Tenant deleted!");
      // Optionally redirect or logout
    } catch (err) {
      console.error("Error deleting tenant", err);
    }
  };

  if (!tenant) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 30, padding: 10, border: "1px solid #607d8b" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{
          background: "#607d8b",
          color: "#fff",
          padding: "2px 10px",
          borderRadius: 8,
          fontWeight: "bold",
          fontSize: 13,
          marginRight: 8
        }}>
          My Tenant
        </span>
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Tenant Name:</label>
        <input
          name="name"
          value={tenantFields.name}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Tenant Name"
        />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Domain:</label>
        <input
          name="domain"
          value={tenantFields.domain}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Domain"
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={handleTenantUpdate} style={{ marginRight: 10 }}>
          Update
        </button>
        <button
          onClick={handleTenantDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}