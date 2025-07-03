import React, { useEffect, useState } from "react";
import axios from "../../api/axiosGlobal";

const PublicModelList = ({ canEdit = false, onEdit, onDelete }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModels = async () => {
    try {
      const res = await axios.get("/car-models/");
      const data = res.data;

      if (Array.isArray(data)) {
        setModels(data);
      } else if (Array.isArray(data.models)) {
        setModels(data.models);
      } else {
        const key = Object.keys(data)[0];
        if (Array.isArray(data[key])) {
          setModels(data[key]);
        } else {
          setError("Unexpected response structure");
        }
      }
    } catch (err) {
      setError("Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this model?")) return;
    try {
      await axios.delete(`/car-models/${id}`);
      fetchModels();
      onDelete && onDelete();
    } catch {
      alert("Failed to delete model");
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {models.length === 0 ? (
        <p>No car models found.</p>
      ) : (
        <ul>
          {models.map((model) => (
            <li key={model.id}>
              {model.name} (Brand ID: {model.brand_id})
              {canEdit && (
                <>
                  {" "}
                  <button onClick={() => onEdit?.(model.id)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(model.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicModelList;
