import Header from "../components/public/layout/Header";
import Footer from "../components/public/layout/Footer";

import { useBookingForm } from "../hooks/useBookingForm";
import BookingForm from "../components/public/BookingForm";

export default function BookNow(car) {
  const {
    form,
    loading,
    success,
    error,
    handleChange,
    handleSubmit
  } = useBookingForm(car);

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Book This Car</h2>
          <BookingForm
            form={form}
            loading={loading}
            success={success}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
