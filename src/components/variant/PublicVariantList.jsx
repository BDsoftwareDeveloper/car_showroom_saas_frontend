import { useEffect, useState } from "react";
import axios from "../../api/axiosGlobal";

const PublicVariantList = ({ modelId, onVariantSelect }) => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modelId) {
      setVariants([]);
      setSelectedVariant("");
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`/car-variants/by_model/?model_id=${modelId}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setVariants(data);
        setSelectedVariant("");
      })
      .catch(() => {
        setError("Failed to load variants");
        setVariants([]);
        setSelectedVariant("");
      })
      .finally(() => setLoading(false));
  }, [modelId]);

  const handleChange = (e) => {
    setSelectedVariant(e.target.value);
    if (onVariantSelect) onVariantSelect(e.target.value);
  };

  return (
    <div>
      <label>Variant: </label>
      {loading ? (
        <span>Loading variants...</span>
      ) : error ? (
        <span style={{ color: "red" }}>{error}</span>
      ) : (
        <select value={selectedVariant} onChange={handleChange}>
          <option value="">-- Select Variant --</option>
          {variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PublicVariantList;

