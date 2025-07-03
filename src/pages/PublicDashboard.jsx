import { useEffect, useState } from "react";
import axios from "../api/axiosGlobal";
import PublicVariantList from "../components/variant/PublicVariantList";

export default function PublicDashboard() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    axios.get("/car-brands/").then(res => {
      setBrands(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      axios.get(`/car-models/?brand_id=${selectedBrand}`).then(res => {
        setModels(Array.isArray(res.data) ? res.data : []);
      });
    } else {
      setModels([]);
      setSelectedModel("");
    }
  }, [selectedBrand]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 Welcome to Our Car Showroom</h1>

      <section style={{ marginBottom: "20px" }}>
        <label>Brand: </label>
        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
        >
          <option value="">-- Select Brand --</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </section>

      {selectedBrand && (
        <section style={{ marginBottom: "20px" }}>
          <label>Model: </label>
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
          >
            <option value="">-- Select Model --</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </section>
      )}

      {selectedModel && (
        <section>
          <h2>Variants</h2>
          <PublicVariantList modelId={selectedModel} />
        </section>
      )}
    </div>
  );
}
