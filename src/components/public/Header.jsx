import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/Header.css";

export default function Header({ logoUrl = "", title = "CarShowroom SaaS" }) {
  const fallbackLogo = "/images/logo.svg";
  const fallbackTitle = "CarShowroom SaaS";

  return (
    <header className="header">
      <div className="header__logo-container">
        {(logoUrl || fallbackLogo) && (
          <img
            src={logoUrl || fallbackLogo}
            alt={title || fallbackTitle}
            className="header__logo"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackLogo;
            }}
          />
        )}
        <h1 className="header__title">{title || fallbackTitle}</h1>
      </div>

      <nav className="header__nav">
        <Link to="/" className="header__nav-link" aria-label="Home">
          Home
        </Link>
        <Link to="/features" className="header__nav-link" aria-label="Features">
          Features
        </Link>
        <Link to="/contact" className="header__nav-link" aria-label="Contact">
          Contact
        </Link>
        <Link to="/login" className="header__login-link" aria-label="Login">
          Login
        </Link>
      </nav>
    </header>
  );
}

Header.propTypes = {
  logoUrl: PropTypes.string,
  title: PropTypes.string,
};
