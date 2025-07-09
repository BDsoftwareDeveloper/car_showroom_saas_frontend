// import { useEffect, useState } from "react";
// import axios from "../../api/axios";

// const fieldRowStyle = {
//   display: "flex",
//   alignItems: "center",
//   marginBottom: 8,
// };
// const labelStyle = {
//   minWidth: 120,
//   fontWeight: "bold",
//   marginRight: 8,
// };

// export default function TenantManagement() {
//   const [tenants, setTenants] = useState([]);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [tenantFields, setTenantFields] = useState({
//     name: "",
//     domain: "",
//   });

//   const fetchTenants = async () => {
//     try {
//       const res = await axios.get("/tenants/");
//       setTenants(res.data);
//     } catch (err) {
//       console.error("Error fetching tenants", err);
//     }
//   };

//   useEffect(() => {
//     fetchTenants();
//   }, []);

//   const handleTenantChange = (e) => {
//     const tenantId = e.target.value;
//     const tenant = tenants.find((t) => t.id === parseInt(tenantId));
//     setSelectedTenant(tenant);
//     if (tenant) {
//       setTenantFields({
//         name: tenant.name || "",
//         domain: tenant.domain || "",
//       });
//     } else {
//       setTenantFields({ name: "", domain: "" });
//     }
//   };

//   const handleTenantFieldChange = (e) => {
//     setTenantFields({ ...tenantFields, [e.target.name]: e.target.value });
//   };

//   const handleTenantCreate = async () => {
//     try {
//       await axios.post("/tenants/", tenantFields);
//       alert("Tenant created!");
//       setTenantFields({ name: "", domain: "" });
//       setSelectedTenant(null);
//       fetchTenants();
//     } catch (err) {
//       console.error("Error creating tenant", err);
//       if (err.response?.data?.detail) {
//         alert(JSON.stringify(err.response.data.detail));
//       }
//     }
//   };

//   const handleTenantUpdate = async () => {
//     if (!selectedTenant) return;
//     try {
//       await axios.put(`/tenants/${selectedTenant.id}`, tenantFields);
//       alert("Tenant updated!");
//       fetchTenants();
//     } catch (err) {
//       console.error("Error updating tenant", err);
//     }
//   };

//   const handleTenantDelete = async () => {
//     if (!selectedTenant || !window.confirm("Are you sure you want to delete this tenant?")) return;
//     try {
//       await axios.delete(`/tenants/${selectedTenant.id}`);
//       alert("Tenant deleted!");
//       setSelectedTenant(null);
//       setTenantFields({ name: "", domain: "" });
//       fetchTenants();
//     } catch (err) {
//       console.error("Error deleting tenant", err);
//     }
//   };

//   return (
//     <div style={{ marginTop: 30, padding: 10, border: "1px solid #607d8b" }}>
//       <div style={{ marginBottom: 8 }}>
//         <span style={{
//           background: "#607d8b",
//           color: "#fff",
//           padding: "2px 10px",
//           borderRadius: 8,
//           fontWeight: "bold",
//           fontSize: 13,
//           marginRight: 8
//         }}>
//           Level: Tenant
//         </span>
//       </div>
//       <div style={{ marginBottom: 10 }}>
//         <label>Tenant: </label>
//         <select onChange={handleTenantChange} value={selectedTenant?.id || ""}>
//           <option value="">Add New Tenant</option>
//           {tenants.map((tenant) => (
//             <option key={tenant.id} value={tenant.id}>
//               {tenant.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div style={fieldRowStyle}>
//         <label style={labelStyle}>Tenant Name:</label>
//         <input
//           name="name"
//           value={tenantFields.name}
//           onChange={handleTenantFieldChange}
//           style={{ padding: 8, width: "80%" }}
//           placeholder="Tenant Name"
//         />
//       </div>
//       <div style={fieldRowStyle}>
//         <label style={labelStyle}>Domain:</label>
//         <input
//           name="domain"
//           value={tenantFields.domain}
//           onChange={handleTenantFieldChange}
//           style={{ padding: 8, width: "80%" }}
//           placeholder="Domain"
//         />
//       </div>
//       <div style={{ marginTop: 10 }}>
//         {selectedTenant ? (
//           <>
//             <button onClick={handleTenantUpdate} style={{ marginRight: 10 }}>
//               Update
//             </button>
//             <button
//               onClick={handleTenantDelete}
//               style={{ backgroundColor: "red", color: "white" }}
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => {
//                 setSelectedTenant(null);
//                 setTenantFields({ name: "", domain: "" });
//               }}
//               style={{ marginLeft: 10 }}
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button onClick={handleTenantCreate}>
//             Add
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



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
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [tenantFields, setTenantFields] = useState({
    name: "",
    subdomain: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchTenants = async () => {
    try {
      const res = await axios.get("/tenants/");
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants", err);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleTenantChange = (e) => {
    const tenantId = e.target.value;
    const tenant = tenants.find((t) => t.id === parseInt(tenantId));
    setSelectedTenant(tenant);
    if (tenant) {
      setTenantFields({
        name: tenant.name || "",
        subdomain: tenant.subdomain || "",
        email: tenant.email || "",
        phone: tenant.phone || "",
        address: tenant.address || "",
      });
    } else {
      setTenantFields({
        name: "",
        subdomain: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  const handleTenantFieldChange = (e) => {
    setTenantFields({ ...tenantFields, [e.target.name]: e.target.value });
  };

  const handleTenantCreate = async () => {
    try {
      await axios.post("/tenants/", tenantFields);
      alert("Tenant created!");
      setTenantFields({ name: "", subdomain: "", email: "", phone: "", address: "" });
      setSelectedTenant(null);
      fetchTenants();
    } catch (err) {
      console.error("Error creating tenant", err);
      if (err.response?.data?.detail) {
        alert(JSON.stringify(err.response.data.detail));
      }
    }
  };

  const handleTenantUpdate = async () => {
    if (!selectedTenant) return;
    try {
      await axios.put(`/tenants/${selectedTenant.id}`, tenantFields);
      alert("Tenant updated!");
      fetchTenants();
    } catch (err) {
      console.error("Error updating tenant", err);
    }
  };

  const handleTenantDelete = async () => {
    if (!selectedTenant || !window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      await axios.delete(`/tenants/${selectedTenant.id}`);
      alert("Tenant deleted!");
      setSelectedTenant(null);
      setTenantFields({ name: "", subdomain: "", email: "", phone: "", address: "" });
      fetchTenants();
    } catch (err) {
      console.error("Error deleting tenant", err);
    }
  };

  return (
    <div style={{ marginTop: 30, padding: 10, border: "1px solid #607d8b" }}>
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            background: "#607d8b",
            color: "#fff",
            padding: "2px 10px",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 13,
            marginRight: 8,
          }}
        >
          Level: Tenant
        </span>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Tenant: </label>
        <select onChange={handleTenantChange} value={selectedTenant?.id || ""}>
          <option value="">➕ Add New Tenant</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tenant Fields */}
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
        <label style={labelStyle}>Subdomain:</label>
        <input
          name="subdomain"
          value={tenantFields.subdomain}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="subdomain (e.g., showroom123)"
        />
      </div>

      <div style={fieldRowStyle}>
        <label style={labelStyle}>Email:</label>
        <input
          name="email"
          value={tenantFields.email}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Email"
        />
      </div>

      <div style={fieldRowStyle}>
        <label style={labelStyle}>Phone:</label>
        <input
          name="phone"
          value={tenantFields.phone}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Phone"
        />
      </div>

      <div style={fieldRowStyle}>
        <label style={labelStyle}>Address:</label>
        <input
          name="address"
          value={tenantFields.address}
          onChange={handleTenantFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Address"
        />
      </div>

      {/* Actions */}
      <div style={{ marginTop: 10 }}>
        {selectedTenant ? (
          <>
            <button onClick={handleTenantUpdate} style={{ marginRight: 10 }}>
              ✅ Update
            </button>
            <button
              onClick={handleTenantDelete}
              style={{ backgroundColor: "red", color: "white" }}
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => {
                setSelectedTenant(null);
                setTenantFields({ name: "", subdomain: "", email: "", phone: "", address: "" });
              }}
              style={{ marginLeft: 10 }}
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <button onClick={handleTenantCreate}>➕ Add</button>
        )}
      </div>
    </div>
  );
}

