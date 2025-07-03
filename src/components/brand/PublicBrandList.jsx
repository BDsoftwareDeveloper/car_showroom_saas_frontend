import React, { useEffect, useState } from "react";
import axios from "../../api/axiosGlobal";

const PublicBrandList = ({ canEdit = false, onEdit, onDelete }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/car-brands/");
      const data = res.data;

      // Flexible structure parsing
      if (Array.isArray(data)) {
        setBrands(data);
      } else if (Array.isArray(data.brands)) {
        setBrands(data.brands);
      } else {
        const key = Object.keys(data)[0];
        if (Array.isArray(data[key])) {
          setBrands(data[key]);
        } else {
          setError("Unexpected response structure");
        }
      }
    } catch (err) {
      setError("Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;
    try {
      await axios.delete(`/car-brands/${id}`);
      fetchBrands();
      onDelete && onDelete();
    } catch {
      alert("Failed to delete brand");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) return <p>Loading car brands...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {brands.length === 0 ? (
        <p>No car brands found.</p>
      ) : (
        <ul>
          {brands.map((brand) => (
            <li key={brand.id}>
              {brand.name}
              {canEdit && (
                <>
                  {" "}
                  <button onClick={() => onEdit?.(brand.id)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(brand.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicBrandList;
