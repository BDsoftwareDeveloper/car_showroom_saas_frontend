import { useEffect, useState } from "react";
import axios from "../../api/axiosGlobal";

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

export default function GlobalSettings() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [variantFields, setVariantFields] = useState({
    name: "",
    model_id: "",
    engine_type: "",
    transmission: "",
    seats: "",
    fuel_capacity: "",
  });
  const [brandFields, setBrandFields] = useState({ name: "" });
  const [modelFields, setModelFields] = useState({ name: "", brand_id: "" });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/car-brands/");
      setBrands(res.data);
    } catch (err) {
      console.error("Error fetching brands", err);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const res = await axios.get(`/car-models/?brand_id=${brandId}`);
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models", err);
    }
  };

  const fetchVariants = async (modelId) => {
    try {
      const res = await axios.get(`/car-variants/?model_id=${modelId}`);
      setVariants(res.data);
    } catch (err) {
      console.error("Error fetching variants", err);
    }
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
    setSelectedModel(null);
    setSelectedVariant(null);
    setModels([]);
    setVariants([]);
    fetchModels(brandId);

    const brand = brands.find((b) => b.id === parseInt(brandId));
    if (brand) setBrandFields({ name: brand.name });
  };

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    setSelectedModel(modelId);
    setSelectedVariant(null);
    setVariants([]);
    fetchVariants(modelId);

    const model = models.find((m) => m.id === parseInt(modelId));
    if (model) setModelFields({ name: model.name, brand_id: model.brand_id });
  };

  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = variants.find((v) => v.id === parseInt(variantId));
    setSelectedVariant(variant);
    if (variant) {
      setVariantFields({
        name: variant.name || "",
        model_id: variant.model_id || "",
        engine_type: variant.engine_type || "",
        transmission: variant.transmission || "",
        seats: variant.seats || "",
        fuel_capacity: variant.fuel_capacity || "",
      });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setVariantFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const payload = {
      ...variantFields,
      model_id: Number(variantFields.model_id),
      seats: Number(variantFields.seats),
      fuel_capacity: Number(variantFields.fuel_capacity),
    };

    try {
      await axios.put(`/car-variants/${selectedVariant.id}`, payload);
      alert("Variant updated!");
      fetchVariants(selectedModel);
    } catch (err) {
      console.error("Error updating variant", err);
      if (err.response?.data?.detail) {
        alert(JSON.stringify(err.response.data.detail));
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/car-variants/${selectedVariant.id}`);
      alert("Variant deleted!");
      setSelectedVariant(null);
      fetchVariants(selectedModel);
    } catch (err) {
      console.error("Error deleting variant", err);
    }
  };

  const handleBrandFieldChange = (e) => {
    setBrandFields({ ...brandFields, [e.target.name]: e.target.value });
  };

  const handleModelFieldChange = (e) => {
    setModelFields({ ...modelFields, [e.target.name]: e.target.value });
  };

  const handleBrandUpdate = async () => {
    try {
      await axios.put(`/car-brands/${selectedBrand}`, brandFields);
      alert("Brand updated!");
      fetchBrands();
    } catch (err) {
      console.error("Error updating brand", err);
    }
  };

  const handleModelUpdate = async () => {
    try {
      await axios.put(`/car-models/${selectedModel}`, {
        ...modelFields,
        brand_id: Number(modelFields.brand_id),
      });
      alert("Model updated!");
      fetchModels(selectedBrand);
    } catch (err) {
      console.error("Error updating model", err);
    }
  };

  const handleBrandDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`/car-brands/${selectedBrand}`);
      alert("Brand deleted!");
      setSelectedBrand(null);
      setModels([]);
      setVariants([]);
      fetchBrands();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };

  const handleModelDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this model?")) return;
    try {
      await axios.delete(`/car-models/${selectedModel}`);
      alert("Model deleted!");
      setSelectedModel(null);
      setVariants([]);
      fetchModels(selectedBrand);
    } catch (err) {
      console.error("Error deleting model", err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>Brand: </label>
        <select onChange={handleBrandChange} value={selectedBrand || ""}>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {models.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <label>Model: </label>
          <select onChange={handleModelChange} value={selectedModel || ""}>
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {variants.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <label>Variant: </label>
          <select onChange={handleVariantChange} value={selectedVariant?.id || ""}>
            <option value="">Select Variant</option>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBrand && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #aaa" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{
              background: "#1976d2",
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 13,
              marginRight: 8
            }}>
              Level: Brand
            </span>
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Brand Name:</label>
            <input
              name="name"
              value={brandFields.name}
              onChange={handleBrandFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Brand Name"
            />
          </div>
          <button onClick={handleBrandUpdate} style={{ marginLeft: 10 }}>
            Update
          </button>
          <button
            onClick={handleBrandDelete}
            style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      )}

      {selectedModel && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #aaa" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{
              background: "#388e3c",
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 13,
              marginRight: 8
            }}>
              Level: Model
            </span>
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Model Name:</label>
            <input
              name="name"
              value={modelFields.name}
              onChange={handleModelFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Model Name"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Brand ID:</label>
            <input
              name="brand_id"
              value={modelFields.brand_id}
              onChange={handleModelFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Brand ID"
              type="number"
            />
          </div>
          <button onClick={handleModelUpdate} style={{ marginLeft: 10 }}>
            Update Model
          </button>
          <button
            onClick={handleModelDelete}
            style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
          >
            Delete Model
          </button>
        </div>
      )}

      {selectedVariant && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid gray" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{
              background: "#f57c00",
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 13,
              marginRight: 8
            }}>
              Level: Variant
            </span>
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Variant Name:</label>
            <input
              name="name"
              value={variantFields.name}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Name"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Model ID:</label>
            <input
              name="model_id"
              value={variantFields.model_id}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Model ID"
              type="number"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Engine Type:</label>
            <input
              name="engine_type"
              value={variantFields.engine_type}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Engine Type"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Transmission:</label>
            <input
              name="transmission"
              value={variantFields.transmission}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Transmission"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Seats:</label>
            <input
              name="seats"
              value={variantFields.seats}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Seats"
              type="number"
            />
          </div>
          <div style={fieldRowStyle}>
            <label style={labelStyle}>Fuel Capacity:</label>
            <input
              name="fuel_capacity"
              value={variantFields.fuel_capacity}
              onChange={handleFieldChange}
              style={{ padding: 8, width: "80%" }}
              placeholder="Fuel Capacity"
              type="number"
              step="0.1"
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <button onClick={handleUpdate} style={{ marginRight: 10 }}>
              Update
            </button>
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}