import PropTypes from "prop-types";

export default function StatusButtons({ bookingId, onStatusChange }) {
  return (
    <div className="space-x-2">
      <button
        onClick={() => onStatusChange(bookingId, "approved")}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
      >
        Approve
      </button>
      <button
        onClick={() => onStatusChange(bookingId, "rejected")}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  );
}

StatusButtons.propTypes = {
  bookingId: PropTypes.number.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
