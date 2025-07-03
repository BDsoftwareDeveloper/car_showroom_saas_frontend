import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const CreateModelForm = ({ onCreated }) => {
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axios.get("/car-brands/");
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !brandId) return;

    try {
      await axios.post("/car-models/", { name, brand_id: brandId });
      setName("");
      setBrandId("");
      onCreated && onCreated();
    } catch (err) {
      alert("Failed to create model");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Model name"
      />
      <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
        <option value="">Select Brand</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Model</button>
    </form>
  );
};

export default CreateModelForm;
