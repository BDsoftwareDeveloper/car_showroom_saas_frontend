import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function CarDetailsPage() {
  const { car_id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    api.get(`/public/car-details/${car_id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [car_id]);

  if (loading) return <p className="p-6 text-gray-600">Loading car details...</p>;
  if (!car) return <p className="p-6 text-red-600">Car not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link to="/" className="text-blue-500 text-sm hover:underline mb-6 inline-block">← Back to Car List</Link>

      {/* Layout */}
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
          {/* Brand + Name */}
          <div className="flex items-center gap-3">
            {car.brand?.logo_url && (
              <img src={car.brand.logo_url} alt={car.brand.name} className="w-10 h-10 rounded-full border" />
            )}
            <h1 className="text-3xl font-bold">
              {car.brand?.name} {car.name}
            </h1>
          </div>

          <p className="text-gray-600">Model: <strong>{car.model || "N/A"}</strong></p>

          {/* Price + Status */}
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

          {/* Specs */}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full sm:w-auto">
              Book Test Drive
            </button>
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

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! (not yet wired to backend)");
                setShowContact(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              />
              <textarea
                placeholder="Message"
                rows="3"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowContact(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
