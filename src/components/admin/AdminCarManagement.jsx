import { useEffect, useState } from "react";
import axios from "../../api/axios";
import axios_global from "../../api/axiosGlobal";

const fieldRowStyle = { display: "flex", alignItems: "center", marginBottom: 8 };
const labelStyle = { minWidth: 120, fontWeight: "bold", marginRight: 8 };

export default function AdminCarManagement() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carFields, setCarFields] = useState({
    name: "",
    brand_id: "",
    model_id: "",
    variant_id: "",
    model_year: "",
    price: "",
    stock: "",
    image_url: "",
  });

  // Get tenant_id from current user (adjust as needed)
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tenant_id = user.tenant_id;

  useEffect(() => {
    fetchBrands();
    fetchCars();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios_global.get("/car-brands/");
      setBrands(res.data);
    } catch (err) {
      console.error("Error fetching brands", err);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const res = await axios_global.get(`/car-models/?brand_id=${brandId}`);
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models", err);
    }
  };

  const fetchVariants = async (modelId) => {
    try {
      const res = await axios_global.get(`/car-variants/?model_id=${modelId}`);
      setVariants(res.data);
    } catch (err) {
      console.error("Error fetching variants", err);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get("/cars/");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars", err);
    }
  };

  // Handle dropdown changes
  const handleBrandChange = (e) => {
    const brand_id = e.target.value;
    setCarFields({
      ...carFields,
      brand_id,
      model_id: "",
      variant_id: "",
    });
    setModels([]);
    setVariants([]);
    if (brand_id) fetchModels(brand_id);
  };

  const handleModelChange = (e) => {
    const model_id = e.target.value;
    setCarFields({
      ...carFields,
      model_id,
      variant_id: "",
    });
    setVariants([]);
    if (model_id) fetchVariants(model_id);
  };

  const handleVariantChange = (e) => {
    const variant_id = e.target.value;
    setCarFields({ ...carFields, variant_id });
  };

  const handleFieldChange = (e) => {
    setCarFields({ ...carFields, [e.target.name]: e.target.value });
  };

  // CRUD handlers
  const handleCarCreate = async () => {
    if (
      !carFields.name ||
      !carFields.brand_id ||
      !carFields.model_id ||
      !carFields.variant_id ||
      !carFields.model_year ||
      !carFields.price ||
      !carFields.stock ||
      !carFields.image_url
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (!tenant_id) {
      alert("No tenant_id found. Please re-login.");
      return;
    }
    try {
      await axios.post("/cars/", {
        name: carFields.name,
        brand_id: Number(carFields.brand_id),
        model_id: Number(carFields.model_id),
        variant_id: Number(carFields.variant_id),
        model_year: Number(carFields.model_year),
        price: Number(carFields.price),
        stock: Number(carFields.stock),
        image_url: carFields.image_url,
        tenant_id: Number(tenant_id),
      });
      alert("Car created!");
      setCarFields({
        name: "",
        brand_id: "",
        model_id: "",
        variant_id: "",
        model_year: "",
        price: "",
        stock: "",
        image_url: "",
      });
      setSelectedCar(null);
      fetchCars();
    } catch (err) {
      console.error("Error creating car", err);
      if (err.response?.data?.detail) {
        alert("Error: " + JSON.stringify(err.response.data.detail));
      } else if (err.response?.data) {
        alert("Error: " + JSON.stringify(err.response.data));
      } else {
        alert("Error creating car");
      }
    }
  };

  const handleCarUpdate = async () => {
    if (!selectedCar) return;
    if (
      !carFields.name ||
      !carFields.brand_id ||
      !carFields.model_id ||
      !carFields.variant_id ||
      !carFields.model_year ||
      !carFields.price ||
      !carFields.stock ||
      !carFields.image_url
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (!tenant_id) {
      alert("No tenant_id found. Please re-login.");
      return;
    }
    try {
      await axios.put(`/cars/${selectedCar.id}`, {
        name: carFields.name,
        brand_id: Number(carFields.brand_id),
        model_id: Number(carFields.model_id),
        variant_id: Number(carFields.variant_id),
        model_year: Number(carFields.model_year),
        price: Number(carFields.price),
        stock: Number(carFields.stock),
        image_url: carFields.image_url,
        tenant_id: Number(tenant_id),
      });
      alert("Car updated!");
      fetchCars();
    } catch (err) {
      alert("Error updating car");
    }
  };

  const handleCarDelete = async () => {
    if (!selectedCar || !window.confirm("Delete this car?")) return;
    try {
      await axios.delete(`/cars/${selectedCar.id}`);
      alert("Car deleted!");
      setSelectedCar(null);
      setCarFields({
        name: "",
        brand_id: "",
        model_id: "",
        variant_id: "",
        model_year: "",
        price: "",
        stock: "",
        image_url: "",
      });
      fetchCars();
    } catch (err) {
      alert("Error deleting car");
    }
  };

  // When selecting a car from the list
  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setCarFields({
      name: car.name || "",
      brand_id: car.brand_id || "",
      model_id: car.model_id || "",
      variant_id: car.variant_id || "",
      model_year: car.model_year || "",
      price: car.price || "",
      stock: car.stock || "",
      image_url: car.image_url || "",
    });
    if (car.brand_id) fetchModels(car.brand_id);
    if (car.model_id) fetchVariants(car.model_id);
  };

  if (!tenant_id) {
    return (
      <div style={{ color: "red", padding: 20 }}>
        <b>Error:</b> No tenant ID found. Please log in again.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #388e3c" }}>
      <h3>Car Management</h3>
      {/* Car List */}
      <table style={{ width: "100%", marginBottom: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Brand</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Model</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Variant</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Year</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Price</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Stock</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Image</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{car.name}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {brands.find(b => b.id === car.brand_id)?.name || car.brand_id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {models.find(m => m.id === car.model_id)?.name || car.model_id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {variants.find(v => v.id === car.variant_id)?.name || car.variant_id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{car.model_year}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{car.price}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{car.stock}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {car.image_url ? <img src={car.image_url} alt="" style={{ width: 50 }} /> : ""}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                <button onClick={() => handleSelectCar(car)} style={{ marginRight: 8 }}>Update</button>
                <button onClick={() => { setSelectedCar(car); handleCarDelete(); }} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Car Form */}
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Name:</label>
        <input name="name" value={carFields.name} onChange={handleFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Brand:</label>
        <select name="brand_id" value={carFields.brand_id} onChange={handleBrandChange} style={{ padding: 8, width: "80%" }}>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Model:</label>
        <select name="model_id" value={carFields.model_id} onChange={handleModelChange} style={{ padding: 8, width: "80%" }}>
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Variant:</label>
        <select name="variant_id" value={carFields.variant_id} onChange={handleVariantChange} style={{ padding: 8, width: "80%" }}>
          <option value="">Select Variant</option>
          {variants.map((variant) => (
            <option key={variant.id} value={variant.id}>{variant.name}</option>
          ))}
        </select>
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Model Year:</label>
        <input name="model_year" type="number" value={carFields.model_year} onChange={handleFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Price:</label>
        <input name="price" type="number" value={carFields.price} onChange={handleFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Stock:</label>
        <input name="stock" type="number" value={carFields.stock} onChange={handleFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Image URL:</label>
        <input name="image_url" value={carFields.image_url} onChange={handleFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={selectedCar ? handleCarUpdate : handleCarCreate} style={{ marginRight: 10 }}>
          {selectedCar ? "Update Car" : "Add Car"}
        </button>
        {selectedCar && (
          <button
            onClick={() => {
              setSelectedCar(null);
              setCarFields({
                name: "",
                brand_id: "",
                model_id: "",
                variant_id: "",
                model_year: "",
                price: "",
                stock: "",
                image_url: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}