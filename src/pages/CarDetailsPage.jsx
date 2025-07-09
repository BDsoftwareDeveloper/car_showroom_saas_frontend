import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CarDetailsPage() {
  const { car_id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch(`/api/public/car-details/${car_id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [car_id]);

  if (loading) return <p className="p-6">Loading car details...</p>;
  if (!car) return <p className="p-6 text-red-600">Car not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/" className="text-blue-500 text-sm hover:underline mb-4 inline-block">← Back to Car List</Link>

      <h1 className="text-3xl font-bold mb-2">{car.brand} {car.name}</h1>
      <p className="text-gray-500 text-sm mb-1">Model: {car.model}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">৳ {car.price}</p>

      {car.image_url && (
        <img src={car.image_url} alt={car.name} className="w-full rounded-lg mb-6 shadow" />
      )}

      <h2 className="text-xl font-bold mb-2">Details</h2>
      <p className="text-gray-700 mb-6">{car.description || "No description available."}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Book Test Drive
        </button>
        <button
          onClick={() => setShowContact(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Contact Seller
        </button>
      </div>

      {showContact && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
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
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Message"
                rows="3"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowContact(false)} className="px-3 py-1 border rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
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
