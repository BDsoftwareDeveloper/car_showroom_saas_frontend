import PropTypes from "prop-types";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

export default function Footer({
  aboutText,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  linkedinUrl,
  footerText,
}) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", url: facebookUrl },
    { icon: <FaTwitter />, label: "Twitter", url: twitterUrl },
    { icon: <FaInstagram />, label: "Instagram", url: instagramUrl },
    { icon: <FaLinkedinIn />, label: "LinkedIn", url: linkedinUrl },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">SpeedAuto</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            {aboutText ||
              "Cloud-powered platform to manage your car dealership with ease."}
          </p>
        </div>

        {/* Contact Info (Optional Static Section) */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="mailto:support@speedauto.com"
                className="hover:text-white transition"
              >
                📧 support@speedauto.com
              </a>
            </li>
            <li>
              <a
                href="tel:+880123456789"
                className="hover:text-white transition"
              >
                📞 +880-123-456789
              </a>
            </li>
            <li className="text-gray-400">📍 Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Subscribe</h3>
          <NewsletterForm subdomain={localStorage.getItem("tenant_subdomain") || "default"} />
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            {socialLinks.map(
              ({ icon, label, url }) =>
                url && (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                )
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        {footerText || `© ${currentYear} SpeedAuto. All rights reserved.`}
      </div>
    </footer>
  );
}

// ✅ Define expected props
Footer.propTypes = {
  aboutText: PropTypes.string,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  instagramUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  footerText: PropTypes.string,
};
