import api from "./axios";

export const fetchAdminBookings = async () => {
  return await api.get("/admin/car_bookings");
};

export const updateBookingStatus = async (bookingId, status) => {
  return await api.patch(
    `/admin/bookings/${bookingId}/status`,
    { status },
  );
};
