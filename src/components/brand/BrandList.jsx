import React, { useEffect, useState } from "react";
import axios from "../../api/axiosGlobal";

const BrandList = ({ role }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");

  const isSuperadmin = role === "superadmin";
  const canCreate = isSuperadmin || ["admin", "sales", "manager", "staff"].includes(role);
  const canEditDelete = isSuperadmin;

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/car-brands/");
      setBrands(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch brands", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this brand?")) {
      await axios.delete(`/car-brands/${id}`);
      fetchBrands();
    }
  };

  return (
    <div>
      <h3>Car Brands</h3>

      {loading ? (
        <p>Loading...</p>
      ) : brands.length === 0 ? (
        <p>No brands found.</p>
      ) : (
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={{ padding: "5px", minWidth: "200px" }}
        >
          <option value="">-- Select Brand --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      )}

      {canCreate && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => alert("Open create brand form")}>➕ Add Brand</button>
        </div>
      )}

      {canEditDelete && selectedBrand && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => alert(`Edit brand ${selectedBrand}`)}>✏️ Edit</button>{" "}
          <button onClick={() => handleDelete(selectedBrand)}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default BrandList;

