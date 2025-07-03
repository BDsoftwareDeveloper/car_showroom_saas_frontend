import React, { useState } from "react";
import axios from "../../api/axios";

const CreateBrandForm = ({ onCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post("/car-brands/", { name });
      setName("");
      onCreated && onCreated(); // Refresh parent list
    } catch (err) {
      alert("Failed to create brand");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter brand name"
      />
      <button type="submit">Add Brand</button>
    </form>
  );
};

export default CreateBrandForm;
