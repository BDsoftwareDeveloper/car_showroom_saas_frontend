import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import {
  fetchAdminBookings,
  updateBookingStatus,
} from "../../../api/bookingApi";
import { logError } from "../../../utils/errorHandler";

export default function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await fetchAdminBookings();
      if (!res.data || !Array.isArray(res.data)) {
        throw new Error("Invalid bookings data format");
      }
      setBookings(res.data);
    } catch (err) {
      logError("Fetch Bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      await loadBookings(); // refresh
    } catch (err) {
      logError("Update Booking Status", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📆 Booking Management</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <BookingTable bookings={bookings} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}

