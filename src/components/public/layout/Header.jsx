import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ logoUrl = "", title = "CarShowroom SaaS" }) {
  const fallbackLogo = "/images/logo.svg";
  const fallbackTitle = "CarShowroom SaaS";

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          {(logoUrl || fallbackLogo) && (
            <img
              src={logoUrl || fallbackLogo}
              alt={title || fallbackTitle}
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackLogo;
              }}
            />
          )}
          <h1 className="text-xl font-semibold text-gray-800">{title || fallbackTitle}</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition"
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-gray-600 hover:text-blue-600 transition"
            aria-label="Features"
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-600 transition"
            aria-label="Contact"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            aria-label="Login"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  logoUrl: PropTypes.string,
  title: PropTypes.string,
};

