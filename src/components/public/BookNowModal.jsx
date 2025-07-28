import { useState } from "react";
import api from "../../api/axios";

export default function BookNowModal({ car, tenant, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", preferred_time: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: 0,
        name: form.name,
        email: form.email,
        preferred_time: form.preferred_time,
        car_id: car.id,
        tenant_subdomain: tenant,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      console.log("Submitting booking request:", payload);
      const res = await api.post("/public/book-test-drive", payload);
      setMessage(res.data.message || "Booking request submitted!");
    } catch (err) {
      setMessage("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Book Test Drive – {car.brand} {car.name}</h2>
        {message ? (
          <div className="text-green-600">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" name="name" required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
            <input
              type="email" name="email" required
              placeholder="Your Email"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
            <input
              type="text" name="preferred_time" required
              placeholder="Preferred Time (e.g. Tomorrow 3 PM)"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
            <div className="flex justify-end gap-2">
              <button onClick={onClose} type="button" className="border px-4 py-2 rounded">Cancel</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
