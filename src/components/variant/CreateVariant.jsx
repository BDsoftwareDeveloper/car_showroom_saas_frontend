import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const CreateVariantForm = ({ onCreated }) => {
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      const res = await axios.get("/car-models/");
      setModels(res.data);
    };
    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !modelId) return;

    try {
      await axios.post("/car-variants/", { name, model_id: modelId });
      setName("");
      setModelId("");
      onCreated && onCreated();
    } catch (err) {
      alert("Failed to create variant");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Variant name"
      />
      <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
        <option value="">Select Model</option>
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Variant</button>
    </form>
  );
};

export default CreateVariantForm;
