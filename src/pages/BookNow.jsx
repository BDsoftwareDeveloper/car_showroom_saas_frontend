import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";


export default function BookNow() {
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carId"));
  const tenant_subdomain = searchParams.get("tenant_subdomain") || window.location.hostname.split('.')[0];
  const [form, setForm] = useState({ name: "", email: "", preferred_time: "", status: "pending" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        id: 0,
        name: form.name,
        email: form.email,
        preferred_time: form.preferred_time,
        car_id: carId,
        tenant_subdomain,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      await axios.post("/public/book-test-drive", payload);
      setSuccess("Your booking request has been submitted!");
      setForm({ name: "", email: "", preferred_time: "", status: "pending" });
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Book This Car</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="carId" value={carId || ""} />
          <input type="hidden" name="tenant_subdomain" value={tenant_subdomain} />
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400" type="text" name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400" type="email" name="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Preferred Time</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400" type="text" name="preferred_time" required value={form.preferred_time} onChange={handleChange} />
          </div>
          <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
          {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
          {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}