import { useEffect, useState } from "react";
import api from "../../api/axios";
import apiGlobal from "../../api/axiosGlobal";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import CarList from "./CarList";
import CarInfo from "./CarInfo";

const AdminCarManagement = ({ tenant }) => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);

  const [selectedCarId, setSelectedCarId] = useState(null);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [carFields, setCarFields] = useState({
    name: "",
    brand_id: "",
    car_model_id: "",
    variant_id: "",
    production_year: "",
    price: "",
    stock: "",
    is_featured: false,
    is_public: true,
    image_url: "",
    status: "available", // ✅ Add default status
  });

  const [selectedCarInfo, setSelectedCarInfo] = useState(null);
  const [isCarManuallySelected, setIsCarManuallySelected] = useState(false);

  const filteredCars = cars.filter(
    (car) =>
      (!filterBrand || car.brand_id == filterBrand) &&
      (!filterStatus || car.status === filterStatus)
  );

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Now useEffect can safely use paginatedCars
  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!isCarManuallySelected) {
      if (paginatedCars.length > 0) {
        setSelectedCarInfo(paginatedCars[0]);
      } else {
        setSelectedCarInfo(null);
      }
    }
  }, [paginatedCars, isCarManuallySelected]);

  const fetchCars = async () => {
    try {
      const res = await api.get(`/cars/`);
      setCars(res.data);
    } catch (err) {
      toast.error("Failed to load cars");
    }
  };

  const fetchBrands = async () => {
    const res = await apiGlobal.get("/car-brands");
    setBrands(res.data);
  };

  const fetchModels = async (brand_id) => {
    if (!brand_id) return;
    const res = await apiGlobal.get(`/car-models?brand_id=${brand_id}`);
    setModels(res.data);
  };

  const fetchVariants = async (model_id) => {
    if (!model_id) return;
    const res = await apiGlobal.get(`/car-variants?car_model_id=${model_id}`);
    setVariants(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "brand_id") {
      fetchModels(value);
      setCarFields((prev) => ({
        ...prev,
        car_model_id: "",
        variant_id: "",
      }));
    }

    if (name === "car_model_id") {
      fetchVariants(value);
      setCarFields((prev) => ({
        ...prev,
        variant_id: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
  ...carFields,
  // tenant_id: tenant,
  variant_id: carFields.variant_id === "" ? null : Number(carFields.variant_id),
  brand_id: Number(carFields.brand_id),
  car_model_id: carFields.car_model_id === "" ? null : Number(carFields.car_model_id),

  // Fix: only convert if value exists
  production_year:
    carFields.production_year === "" ? undefined : Number(carFields.production_year),

  price: carFields.price === "" ? undefined : Number(carFields.price),
  stock: carFields.stock === "" ? undefined : Number(carFields.stock),
};

  console.log("🚗 Submitting Car Payload:", payload);

  try {
    if (selectedCarId) {
      await api.put(`/cars/${selectedCarId}`, payload);
      toast.success("Car updated");
    } else {
      await api.post("/cars/", payload);
      toast.success("Car added");
    }
    fetchCars();
    resetForm();
  } catch (err) {
    toast.error("Car save failed");
    console.error(err?.response?.data || err.message);
  }
};

  const handleEdit = (car) => {
    setSelectedCarId(car.id);
    setCarFields({
    name: car.name,
    brand_id: car.brand_id,
    car_model_id: car.car_model_id,
    variant_id: car.variant_id,
    production_year: car.production_year,
    price: car.price,
    stock: car.stock,
    is_featured: car.is_featured,
    is_public: car.is_public,
    image_url: car.image_url || "",
    status: car.status || "available", // ✅ Default to "available"
    });

    fetchModels(car.brand_id);
    fetchVariants(car.car_model_id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await api.delete(`/cars/${id}`);
        toast.success("Car deleted");
        fetchCars();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setSelectedCarId(null);
    setCarFields({
    name: "",
    brand_id: "",
    car_model_id: "",
    variant_id: "",
    production_year: "",
    price: "",
    stock: "",
    is_featured: false,
    is_public: true,
    image_url: "",
    status: "available", // ✅ Reset to default status
    });
  };

  return (
    <div className="container mx-auto px-2 py-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="col-span-1 md:col-span-2 text-2xl font-bold text-blue-700 mb-2">
          {selectedCarId ? "Edit Car" : "Add New Car"}
        </h2>

        <input
          name="name"
          placeholder="Car Name"
          value={carFields.name ?? ""}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={carFields.image_url ?? ""}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
        />

        <select name="brand_id" value={carFields.brand_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" required>
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <select name="car_model_id" value={carFields.car_model_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" required>
          <option value="">Select Model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <select name="car_variant_id" value={carFields.car_variant_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" required>
          <option value="">Select Variant</option>
          {variants.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="production_year"
          placeholder="Year"
          value={carFields.production_year ?? ""}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={carFields.price ?? ""}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={carFields.stock ?? ""}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_featured" checked={carFields.is_featured} onChange={handleChange} />
          <label className="text-blue-700 font-medium">Feature</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_public" checked={carFields.is_public} onChange={handleChange} />
          <label className="text-blue-700 font-medium">Public</label>
        </div>

        <select name="status" value={carFields.status} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" required>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
          <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">{selectedCarId ? "Update" : "Add"}</button>
          {selectedCarId && (
            <button type="button" onClick={resetForm} className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow">Cancel</button>
          )}
        </div>
      </form>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <CarList
            cars={paginatedCars}
            selectedCarInfo={selectedCarInfo}
            onSelectCar={(car) => {
              setSelectedCarInfo(car);
              setIsCarManuallySelected(true);
            }}
          />
        </div>
        <div className="md:w-2/3">
          <CarInfo
            car={selectedCarInfo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {filteredCars.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded shadow"
          >
            Prev
          </button>
          <span className="self-center text-sm font-semibold text-blue-700">Page {currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                p < Math.ceil(filteredCars.length / itemsPerPage) ? p + 1 : p
              )
            }
            disabled={currentPage === Math.ceil(filteredCars.length / itemsPerPage)}
            className="btn bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded shadow"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCarManagement;
