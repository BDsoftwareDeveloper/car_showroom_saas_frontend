import PropTypes from "prop-types";
import StatusButtons from "./StatusButtons";

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function BookingTable({ bookings, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Car</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{booking.name}</td>
              <td className="border px-4 py-2">{booking.email}</td>
              <td className="border px-4 py-2">
                {booking.car?.name || `Car #${booking.car_id}`}
              </td>
              <td className="border px-4 py-2">
                {(() => {
                  const date = new Date(booking.preferred_time);
                  return isNaN(date)
                    ? "Invalid date"
                    : date.toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      });
                })()}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={booking.status}
                  onChange={(e) =>
                    onStatusChange(booking.id, e.target.value)
                  }
                  className={`border rounded px-2 py-1 text-sm ${getStatusBadgeClass(
                    booking.status
                  )}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <StatusButtons
                  bookingId={booking.id}
                  onStatusChange={onStatusChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BookingTable.propTypes = {
  bookings: PropTypes.array.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
