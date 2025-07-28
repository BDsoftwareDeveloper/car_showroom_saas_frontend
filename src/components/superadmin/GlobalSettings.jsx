import { useEffect, useState } from "react";
import api from "../../api/axios";
import apiGlobal from "../../api/axiosGlobal";
import { toast } from "react-toastify";

const AdminCarManagement = ({ tenant_id }) => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);

  const initialCarState = {
    name: "",
    brand_id: "",
    car_model_id: "",
    variant_id: "",
    production_year: "",
    price: "",
    stock: "",
    image_url: "",
    status: "available",
    is_featured: false,
  };

  const [carFields, setCarFields] = useState(initialCarState);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [carsRes, brandsRes] = await Promise.all([
          api.get("/cars/", { params: { tenant_id } }),
          apiGlobal.get("/car-brands/"),
        ]);
        setCars(carsRes.data);
        setBrands(brandsRes.data);
      } catch (err) {
        toast.error("Failed to fetch initial data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [tenant_id]);

  const fetchModels = async (brandId) => {
    if (!brandId) return;
    try {
      const res = await apiGlobal.get("/car-models/", { 
        params: { brand_id: brandId } 
      });
      setModels(res.data);
    } catch (err) {
      toast.error("Failed to fetch models");
      console.error(err);
    }
  };

  const fetchVariants = async (modelId) => {
    if (!modelId) return;
    try {
      const res = await apiGlobal.get("/car-variants/", { 
        params: { model_id: modelId } 
      });
      setVariants(res.data);
    } catch (err) {
      toast.error("Failed to fetch variants");
      console.error(err);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "brand_id") {
      setCarFields(prev => ({ ...prev, car_model_id: "", variant_id: "" }));
      setModels([]);
      setVariants([]);
      fetchModels(value);
    }

    if (name === "car_model_id") {
      setCarFields(prev => ({ ...prev, variant_id: "" }));
      setVariants([]);
      fetchVariants(value);
    }
  };

  const handleCarCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/cars/", {
        ...carFields,
        brand_id: Number(carFields.brand_id),
        car_model_id: Number(carFields.car_model_id),
        variant_id: Number(carFields.variant_id),
        production_year: Number(carFields.production_year),
        price: Number(carFields.price),
        stock: Number(carFields.stock),
        tenant_id: Number(tenant_id),
      });
      toast.success("Car created successfully");
      setCarFields(initialCarState);
      const res = await api.get("/cars/", { params: { tenant_id } });
      setCars(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error creating car");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/cars/${selectedCarId}`, {
        ...carFields,
        brand_id: Number(carFields.brand_id),
        car_model_id: Number(carFields.car_model_id),
        variant_id: Number(carFields.variant_id),
        production_year: Number(carFields.production_year),
        price: Number(carFields.price),
        stock: Number(carFields.stock),
        tenant_id: Number(tenant_id),
      });
      toast.success("Car updated successfully");
      const res = await api.get("/cars/", { params: { tenant_id } });
      setCars(res.data);
      setSelectedCarId(null);
      setCarFields(initialCarState);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error updating car");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCar = (car) => {
    setSelectedCarId(car.id);
    setCarFields({
      name: car.name || "",
      brand_id: car.brand_id || "",
      car_model_id: car.car_model_id || "",
      variant_id: car.variant_id || "",
      production_year: car.production_year || "",
      price: car.price || "",
      stock: car.stock || "",
      image_url: car.image_url || "",
      status: car.status || "available",
      is_featured: car.is_featured || false,
    });

    // Fetch related models and variants if needed
    if (car.brand_id) fetchModels(car.brand_id);
    if (car.car_model_id) fetchVariants(car.car_model_id);
  };

  const handleCancelEdit = () => {
    setSelectedCarId(null);
    setCarFields(initialCarState);
  };

  const inputFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "production_year", label: "Year", type: "number", min: 1900, max: new Date().getFullYear() + 1 },
    { name: "price", label: "Price", type: "number", min: 0 },
    { name: "stock", label: "Stock", type: "number", min: 0 },
    { name: "image_url", label: "Image URL", type: "url" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Car Management</h1>
      
      <form
        onSubmit={selectedCarId ? handleCarUpdate : handleCarCreate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
      >
        {inputFields.map(({ name, label, type, ...props }) => (
          <div key={name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              name={name}
              type={type}
              placeholder={label}
              value={carFields[name]}
              onChange={handleFieldChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              {...props}
            />
          </div>
        ))}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            name="brand_id"
            value={carFields.brand_id}
            onChange={handleFieldChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <select
            name="car_model_id"
            value={carFields.car_model_id}
            onChange={handleFieldChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={!carFields.brand_id}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Variant
          </label>
          <select
            name="variant_id"
            value={carFields.variant_id}
            onChange={handleFieldChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={!carFields.car_model_id}
          >
            <option value="">Select Variant</option>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={carFields.status}
            onChange={handleFieldChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_featured"
            checked={carFields.is_featured}
            onChange={handleFieldChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Featured Car
          </label>
        </div>

        <div className="col-span-1 md:col-span-2 flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Processing..." : selectedCarId ? "Update Car" : "Create Car"}
          </button>
          {selectedCarId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Car List Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Car Inventory</h2>
        {isLoading ? (
          <div className="text-center py-8">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No cars found</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Brand",
                    "Model",
                    "Variant",
                    "Year",
                    "Price",
                    "Stock",
                    "Status",
                    "Featured",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{car.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.brand?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.car_model?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.variant?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.production_year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${car.price?.toLocaleString() || "0"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{car.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "sold"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.is_featured ? "⭐" : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleSelectCar(car)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCarManagement;