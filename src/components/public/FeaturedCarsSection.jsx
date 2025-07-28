import React, { useState } from "react";
import BookNowModal from "./BookNowModal";

export default function FeaturedCarsSection({ cars }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const tenant = window.location.hostname.split('.')[0];

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4" id="explore">
      <h3 className="text-4xl font-extrabold text-center text-blue-700 mb-14 drop-shadow-lg tracking-tight">
        Featured Cars
      </h3>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white border border-blue-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-200 p-7 flex flex-col group"
          >
            <div className="flex items-center gap-3 mb-5">
              {car.brand?.logo_url && (
                <img
                  src={car.brand.logo_url}
                  alt={car.brand.name}
                  className="w-12 h-12 object-contain rounded-full border border-blue-200 bg-white shadow"
                />
              )}
              <span className="font-semibold text-blue-700 text-lg">{car.brand?.name}</span>
            </div>
            <img
              src={car.image_url || "/static/images/default_car.png"}
              alt={car.name}
              className="w-full h-44 object-cover rounded-xl mb-5 bg-gray-100 group-hover:scale-105 transition-transform duration-200"
            />
            <h4 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h4>
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Variant:</span> {car.variant?.name || "N/A"}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-2">
              {car.production_year && (
                <span className="bg-blue-50 px-2 py-1 rounded">{car.production_year}</span>
              )}
              {car.variant?.engine_type && (
                <span className="bg-blue-50 px-2 py-1 rounded">{car.variant.engine_type}</span>
              )}
              {car.variant?.transmission && (
                <span className="bg-blue-50 px-2 py-1 rounded">{car.variant.transmission}</span>
              )}
              {car.variant?.seats && (
                <span className="bg-blue-50 px-2 py-1 rounded">{car.variant.seats} seats</span>
              )}
            </div>
            <div className="flex justify-between items-center mt-auto pt-4">
              <span className="text-blue-700 font-bold text-xl">${car.price.toLocaleString()}</span>
              <span className={`px-4 py-1 rounded-full text-xs font-semibold shadow
                ${car.status === "available"
                  ? "bg-green-100 text-green-700"
                  : car.status === "sold"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"}`}>
                {car.status}
              </span>
            </div>
            {/* Action Buttons */}
            {car.status === "available" && (
              <button
                className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
                onClick={() => handleBookNow(car)}
                aria-label={`Book ${car.name}`}
              >
                Book Now
              </button>
            )}
            {car.status === "upcoming" && (
              <button
                className="mt-6 w-full py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow hover:bg-yellow-500 transition"
                onClick={() => window.location.href = `/notify?carId=${car.id}&tenant_subdomain=${tenant}`}
                aria-label={`Notify for ${car.name}`}
              >
                Notify Me
              </button>
            )}
            <button
                className="w-full py-2 border border-blue-600 text-blue-700 font-medium rounded-xl hover:bg-blue-50 transition"
                onClick={() => window.location.href = `/car/${car.id}`}
                aria-label={`View details of ${car.name}`}
            >
                View Details
            </button>

          </div>
        ))}
        {cars.length === 0 && (
          <div className="col-span-full text-gray-400 text-center py-12">No cars available.</div>
        )}
      </div>
      {showModal && selectedCar && (
        <BookNowModal
          car={selectedCar}
          tenant={tenant}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}