import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PublicCarListPage({ tenant }) {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ brand: "", model: "", min_price: "", max_price: "" });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const params = new URLSearchParams({ tenant_subdomain: tenant });
    for (let [key, val] of Object.entries(filters)) {
      if (val) params.append(key, val);
    }

    const res = await fetch(`/api/public/cars?${params}`);
    const data = await res.json();
    setCars(data);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input type="text" name="brand" placeholder="Brand"
          className="border px-2 py-1 rounded text-sm"
          onChange={handleFilterChange}
        />
        <input type="text" name="model" placeholder="Model"
          className="border px-2 py-1 rounded text-sm"
          onChange={handleFilterChange}
        />
        <input type="number" name="min_price" placeholder="Min Price"
          className="border px-2 py-1 rounded text-sm"
          onChange={handleFilterChange}
        />
        <input type="number" name="max_price" placeholder="Max Price"
          className="border px-2 py-1 rounded text-sm"
          onChange={handleFilterChange}
        />
        <button onClick={fetchCars} className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
          Filter
        </button>
      </div>

      {cars.length === 0 && <p>No cars found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="border rounded-lg p-4 shadow hover:shadow-md">
            {car.image_url && (
              <img src={car.image_url} alt={car.name} className="w-full h-40 object-cover rounded mb-3" />
            )}
            <h2 className="text-lg font-semibold">{car.brand} {car.name}</h2>
            <p className="text-sm text-gray-500">Model: {car.model}</p>
            <p className="text-blue-600 font-bold mt-1">৳ {car.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
