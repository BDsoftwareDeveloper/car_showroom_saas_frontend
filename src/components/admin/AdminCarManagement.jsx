


import { useEffect, useState } from "react";
import api from "../../api/axios";
import apiGlobal from "../../api/axiosGlobal";
import { toast } from "react-toastify";
import CarList from "./CarList";
import CarInfo from "./CarInfo";
import { API_BASE_URL } from "../../api/constants"; // make sure this import exists

const AdminCarManagement = ({ tenant }) => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);

  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedCarInfo, setSelectedCarInfo] = useState(null);
  const [isCarManuallySelected, setIsCarManuallySelected] = useState(false);

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
    status: "available",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered & paginated cars
  const filteredCars = cars.filter(
    (car) =>
      (!filterBrand || car.brand_id == filterBrand) &&
      (!filterStatus || car.status === filterStatus)
  );

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!isCarManuallySelected) {
      setSelectedCarInfo(paginatedCars[0] || null);
    }
  }, [paginatedCars, isCarManuallySelected]);

  const fetchCars = async () => {
    try {
      const res = await api.get(`/cars/`);
      setCars(res.data);
    } catch {
      toast.error("Failed to load cars");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await apiGlobal.get("/car-brands");
      setBrands(res.data);
    } catch {}
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

    if (name === "brand_id") {
      fetchModels(value);
      setCarFields((prev) => ({
        ...prev,
        brand_id: Number(value),
        car_model_id: "",
        variant_id: "",
      }));
      return;
    }

    if (name === "car_model_id") {
      fetchVariants(value);
      setCarFields((prev) => ({
        ...prev,
        car_model_id: Number(value),
        variant_id: "",
      }));
      return;
    }

    if (name === "image") {
      const file = e.target.files[0];
      setImageFile(file);
      if (file) setImagePreview(URL.createObjectURL(file));
      return;
    }

    setCarFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", carFields.name);
    formData.append("brand_id", carFields.brand_id);
    formData.append("car_model_id", carFields.car_model_id || "");
    formData.append("variant_id", carFields.variant_id || "");
    formData.append("production_year", carFields.production_year || "");
    formData.append("price", carFields.price || "");
    formData.append("stock", carFields.stock || "");
    formData.append("is_featured", carFields.is_featured);
    formData.append("is_public", carFields.is_public);
    formData.append("status", carFields.status);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (selectedCarId) {
        await api.put(`/cars/${selectedCarId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Car updated successfully");
      } else {
        await api.post(`/cars/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Car added successfully");
      }
      fetchCars();
      resetForm();
    } catch (err) {
      console.error(err?.response?.data || err.message);
      toast.error("Car save failed");
    }
  };

  const handleEdit = (car) => {
  setSelectedCarId(car.id);
  setCarFields({
    name: car.name,
    brand_id: car.brand_id,
    car_model_id: car.car_model_id || "",
    variant_id: car.variant_id || "",
    production_year: car.production_year || "",
    price: car.price || "",
    stock: car.stock || "",
    is_featured: car.is_featured,
    is_public: car.is_public,
    status: car.status || "available",
  });

  setImageFile(null);

  // Show image preview with full URL
  if (car.image_url) {
    setImagePreview(car.image_url.startsWith("http") ? car.image_url : API_BASE_URL + car.image_url);
  } else {
    setImagePreview(null);
  }

  fetchModels(car.brand_id);
  fetchVariants(car.car_model_id);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted successfully");
      fetchCars();
    } catch {
      toast.error("Delete failed");
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
      status: "available",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto px-2 py-6">
      {/* Car Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="col-span-1 md:col-span-2 text-2xl font-bold text-blue-700 mb-2">
          {selectedCarId ? "Edit Car" : "Add New Car"}
        </h2>

        <input
          name="name"
          placeholder="Car Name"
          value={carFields.name}
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
        />

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded-lg border" />
        )}

        <select name="brand_id" value={carFields.brand_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" required>
          <option value="">Select Brand</option>
          {brands.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>

        <select name="car_model_id" value={carFields.car_model_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400">
          <option value="">Select Model</option>
          {models.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
        </select>

        <select name="variant_id" value={carFields.variant_id} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400">
          <option value="">Select Variant</option>
          {variants.map((v) => (<option key={v.id} value={v.id}>{v.name}</option>))}
        </select>

        <input type="number" name="production_year" placeholder="Year" value={carFields.production_year} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" />
        <input type="number" name="price" placeholder="Price" value={carFields.price} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" />
        <input type="number" name="stock" placeholder="Stock" value={carFields.stock} onChange={handleChange} className="input bg-blue-50 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" />

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

      {/* Cars List & Info */}
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
          <CarInfo car={selectedCarInfo} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Pagination */}
      {filteredCars.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded shadow">Prev</button>
          <span className="self-center text-sm font-semibold text-blue-700">Page {currentPage}</span>
          <button onClick={() => setCurrentPage((p) => p < Math.ceil(filteredCars.length / itemsPerPage) ? p + 1 : p)} disabled={currentPage === Math.ceil(filteredCars.length / itemsPerPage)} className="btn bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded shadow">Next</button>
        </div>
      )}
    </div>
  );
};

export default AdminCarManagement;
