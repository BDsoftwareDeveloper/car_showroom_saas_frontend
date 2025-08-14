import React, { useState, useEffect } from "react";
import apiGlobal from "../../api/axiosGlobal";
import { toast } from "react-toastify";

const EntityManagement = ({ entityType, selectedBrandId, selectedModelId, brands, models }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({});

  // Initialize formData based on entity type
  const initFormData = () => {
    if (entityType === "brand") return { name: "", country: "", logo_url: "" };
    if (entityType === "model") return { name: "", brand_id: "" };
    if (entityType === "variant") return { name: "", car_model_id: "" };
    return {};
  };

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      let url =
        entityType === "brand"
          ? "/car-brands"
          : entityType === "model"
          ? "/car-models"
          : "/car-variants";

      const params = {};
      if (entityType === "model" && selectedBrandId) params.brand_id = selectedBrandId;
      if (entityType === "variant" && selectedModelId) params.car_model_id = selectedModelId;

      const res =
        entityType === "model" && selectedBrandId
          ? await apiGlobal.get("/car-models/by-brand", { params })
          : await apiGlobal.get(url, { params });

      setItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error(`❌ Failed to fetch ${entityType}s`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData(initFormData());
    fetchItems();
  }, [entityType, selectedBrandId, selectedModelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (add/update)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
      if (!token) {
        toast.error("⚠️ Unauthorized. Please log in.");
        return;
      }

      const endpointMap = {
        brand: "car-brands",
        model: "car-models",
        variant: "car-variants",
      };
      const endpoint = `/${endpointMap[entityType]}`;
      const method = editItemId ? "put" : "post";
      const url = editItemId ? `${endpoint}/${editItemId}` : endpoint;

      const payload = { ...formData };

      // Validate required fields
      if (entityType === "brand" && (!payload.name || !payload.country || !payload.logo_url)) {
        toast.error("⚠️ Please fill all required fields for brand");
        return;
      }
      if (entityType === "model" && (!payload.name || !payload.brand_id)) {
        toast.error("⚠️ Please fill all required fields for model");
        return;
      }
      if (entityType === "variant" && (!payload.name || !payload.car_model_id)) {
        toast.error("⚠️ Please fill all required fields for variant");
        return;
      }

      // Convert IDs to numbers
      if (payload.brand_id) payload.brand_id = Number(payload.brand_id);
      if (payload.car_model_id) payload.car_model_id = Number(payload.car_model_id);

      await apiGlobal[method](url, payload, { headers: { Authorization: `Bearer ${token}` } });

      toast.success(`✅ ${entityType.charAt(0).toUpperCase() + entityType.slice(1)} ${editItemId ? "updated" : "added"} successfully`);
      setFormData(initFormData());
      setEditItemId(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) toast.error("⚠️ Unauthorized. Superadmin access required.");
      else if (err.response?.status === 422) toast.error("⚠️ Invalid data. Please check required fields.");
      else toast.error(`❌ Failed to save ${entityType}`);
    }
  };

  // Handle edit click
  const handleEdit = (item) => {
    setEditItemId(item.id);
    if (entityType === "brand") setFormData({ id: item.id, name: item.name, country: item.country, logo_url: item.logo_url });
    if (entityType === "model") setFormData({ name: item.name, brand_id: item.brand_id });
    if (entityType === "variant") setFormData({ name: item.name, car_model_id: item.car_model_id });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
      if (!token) {
        toast.error("⚠️ Unauthorized. Please log in.");
        return;
      }

      const url =
        entityType === "brand"
          ? `/car-brands/${id}`
          : entityType === "model"
          ? `/car-models/${id}`
          : `/car-variants/${id}`;

      await apiGlobal.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`✅ ${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully`);
      fetchItems();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) toast.error("⚠️ Unauthorized. Superadmin access required.");
      else toast.error(`❌ Failed to delete ${entityType}`);
    }
  };

  return (
    <div className="mt-4">
      {/* Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          placeholder={`Enter ${entityType} name`}
          className="border rounded px-2 py-1 flex-1"
        />
        {entityType === "brand" && (
          <>
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleInputChange}
              placeholder="Enter country"
              className="border rounded px-2 py-1"
            />
            <input
              type="text"
              name="logo_url"
              value={formData.logo_url || ""}
              onChange={handleInputChange}
              placeholder="Enter logo URL"
              className="border rounded px-2 py-1"
            />
          </>
        )}
        {entityType === "model" && (
          <select name="brand_id" value={formData.brand_id || ""} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Select Brand</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}
        {entityType === "variant" && (
          <select name="car_model_id" value={formData.car_model_id || ""} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Select Model</option>
            {models?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        )}
        <button type="button" onClick={handleSave} className="bg-green-600 text-white px-4 py-1 rounded">
          {editItemId ? "Update" : "Add"}
        </button>
        {editItemId && (
          <button type="button" onClick={() => { setEditItemId(null); setFormData(initFormData()); }} className="bg-gray-400 text-white px-4 py-1 rounded">
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading {entityType}s...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">No {entityType}s found</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">#</th>
              <th className="border px-2 py-1 text-left">Name</th>
              {entityType !== "brand" && <th className="border px-2 py-1 text-left">Brand/Model</th>}
              <th className="border px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{item.name}</td>
                {entityType === "model" && <td className="border px-2 py-1">{brands.find((b) => b.id === item.brand_id)?.name || "-"}</td>}
                {entityType === "variant" && <td className="border px-2 py-1">{models.find((m) => m.id === item.car_model_id)?.name || "-"}</td>}
                <td className="border px-2 py-1 flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EntityManagement;
