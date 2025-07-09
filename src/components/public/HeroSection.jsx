import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Modern Car Showroom Management
      </h2>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        A complete cloud solution to manage cars, sales, customers, and your staff — built for dealerships of all sizes.
      </p>
      <div className="flex gap-4">
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Started</Link>
        <a href="#features" className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">Learn More</a>
      </div>
    </section>
  );
}
