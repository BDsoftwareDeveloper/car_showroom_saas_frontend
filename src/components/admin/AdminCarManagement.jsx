

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import apiGlobal from "../../api/axiosGlobal";

import CarList from "./CarList";
import CarInfo from "./CarInfo";
import CarMediaManager from "./carMedia/CarMediaManager"; 
import { useCarMedia } from "../../hooks/useCarMedia";

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

  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- MEDIA HOOK ---
  const { mediaList, mainImage, deleteMedia, setPrimaryMedia, reorderMedia } = useCarMedia(selectedCarId);

  // --- FILTER & PAGINATION ---
  const filteredCars = cars.filter(
    (car) =>
      (!filterBrand || car.brand_id === filterBrand) &&
      (!filterStatus || car.status === filterStatus)
  );
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- FETCH DATA ---
  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!isCarManuallySelected && paginatedCars.length > 0) {
      setSelectedCarInfo(paginatedCars[0]);
      setSelectedCarId(paginatedCars[0].id);
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

  // --- FORM HANDLING ---
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

    setCarFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...carFields };

    try {
      if (selectedCarId) {
        await api.put(`/cars/${selectedCarId}`, payload);
        toast.success("Car updated successfully");
        // Update car locally instead of refetching
        setCars((prev) =>
          prev.map((c) => (c.id === selectedCarId ? { ...c, ...payload } : c))
        );
      } else {
        const res = await api.post(`/cars/`, payload);
        setSelectedCarId(res.data.id);
        setCars((prev) => [...prev, res.data]);
        toast.success("Car added successfully");
      }
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

    fetchModels(car.brand_id);
    fetchVariants(car.car_model_id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted successfully");
      setCars((prev) => prev.filter((c) => c.id !== id));
      if (id === selectedCarId) {
        setSelectedCarId(null);
        setSelectedCarInfo(null);
      }
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
  };

  // --- LOCAL update for mainImage when primary changes ---
  useEffect(() => {
    if (selectedCarId) {
      setSelectedCarInfo((prev) => prev ? { ...prev } : prev); // trigger re-render
    }
  }, [mainImage, selectedCarId]);

  return (
    <div className="container mx-auto px-2 py-6">
      {/* Car Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="col-span-1 md:col-span-2 text-2xl font-bold text-blue-700 mb-2">
          {selectedCarId ? "Edit Car" : "Add New Car"}
        </h2>

        {/* form inputs ... */}

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
          <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">{selectedCarId ? "Update" : "Add"}</button>
          {selectedCarId && (
            <button type="button" onClick={resetForm} className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow">Cancel</button>
          )}
        </div>
      </form>

      {/* Car List & Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <CarList
            cars={paginatedCars}
            selectedCarInfo={selectedCarInfo}
            onSelectCar={(car) => {
              setSelectedCarInfo(car);
              setSelectedCarId(car.id);
              setIsCarManuallySelected(true);
            }}
          />
        </div>
        <div className="md:w-2/3">
          <CarInfo
            car={selectedCarInfo}
            mainImage={mainImage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {selectedCarId && (
            <CarMediaManager
              carId={selectedCarId}
              mediaList={mediaList}
              deleteMedia={deleteMedia}
              setPrimaryMedia={setPrimaryMedia}
              reorderMedia={reorderMedia}
            />
          )}
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

