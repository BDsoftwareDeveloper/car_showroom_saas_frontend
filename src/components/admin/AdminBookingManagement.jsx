import { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance
import PropTypes from "prop-types";

export default function AdminBookingManagement({ tenant }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/admin/bookings`, {
        params: { tenant_subdomain: tenant },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.patch(
        `/admin/bookings/${bookingId}/status`,
        { status }, // assuming backend expects { status: "new_status" }
        { params: { tenant_subdomain: tenant } }
      );
      await fetchBookings(); // Refresh bookings after status change
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    if (tenant) {
      fetchBookings();
    }
  }, [tenant]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📆 Booking Management</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Customer</th>
                <th className="border px-3 py-2 text-left">Car</th>
                <th className="border px-3 py-2 text-left">Date</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="border px-3 py-2">{booking.customer_name}</td>
                  <td className="border px-3 py-2">{booking.car_model}</td>
                  <td className="border px-3 py-2">{new Date(booking.date).toLocaleString()}</td>
                  <td className="border px-3 py-2">{booking.status}</td>
                  <td className="border px-3 py-2 space-x-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, "approved")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, "rejected")}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

AdminBookingManagement.propTypes = {
  tenant: PropTypes.string.isRequired,
};
