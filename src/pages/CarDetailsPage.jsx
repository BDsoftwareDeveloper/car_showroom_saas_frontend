

// src/pages/public/CarDetailsPage.jsx
import { useParams, Link } from "react-router-dom";
import Header from "../components/public/layout/Header";
import Footer from "../components/public/layout/Footer";
import CarDetailsCard from "../components/public/car/CarDetailsCard";
import { useCarDetails } from "../hooks/useCarDetails";


export default function CarDetailsPage() {
  const { car_id } = useParams();
  const { car, loading } = useCarDetails(car_id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link to="/" className="text-blue-500 text-sm hover:underline mb-4 inline-block">← Back to Car List</Link>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : car ? (
            <CarDetailsCard car={car} />
          ) : (
            <p className="text-red-500">Car not found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
