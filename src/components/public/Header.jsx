import { Link } from "react-router-dom";

const logo = "https://logoipsum.com/logo/logo-1.svg";

export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="CarShowroom Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold text-blue-600">CarShowroom SaaS</h1>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
        <Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

