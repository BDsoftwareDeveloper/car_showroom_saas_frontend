// src/components/public/car/CarDetailsCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import ContactModal from "../common/ContactModal";

export default function CarDetailsCard({ car }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            className="w-full h-auto rounded-xl shadow-lg bg-gray-100"
          />
        ) : (
          <div className="w-full h-64 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {car.brand?.logo_url && (
              <img src={car.brand.logo_url} alt={car.brand.name} className="w-10 h-10 rounded-full border" />
            )}
            <h1 className="text-3xl font-bold">
              {car.brand?.name} {car.name}
            </h1>
          </div>

          <p className="text-gray-600">Model: <strong>{car.model || "N/A"}</strong></p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-blue-700">
              ৳ {car.price.toLocaleString()}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium shadow 
              ${car.status === "available" ? "bg-green-100 text-green-700"
                : car.status === "sold" ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"}`}>
              {car.status}
            </span>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Variant:</strong> {car.variant?.name || "N/A"}</li>
              <li><strong>Engine:</strong> {car.variant?.engine_type || "N/A"}</li>
              <li><strong>Transmission:</strong> {car.variant?.transmission || "N/A"}</li>
              <li><strong>Seats:</strong> {car.variant?.seats || "N/A"}</li>
              <li><strong>Production Year:</strong> {car.production_year || "N/A"}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to={`/book-now?car_id=${car.id}`} className="w-full sm:w-auto">
              <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full sm:w-auto">
                Book Test Drive
              </button>
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 text-sm bg-gray-50 rounded p-4 border">
          {car.description || "No description available."}
        </p>
      </div>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
