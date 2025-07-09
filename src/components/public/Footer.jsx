import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const [tenant, setTenant] = useState(null);
 
  useEffect(() => {
    // const subdomain = window.location.hostname.split(".")[0]; // e.g., 'driveeasy'
    // const subdomain = 'driveeasy'
    // fetch(`/api/v1/public/tenant-profile?subdomain=${subdomain}`)
    fetch(`/api/v1/public/tenant-profile?subdomain=driveeasy`)
      .then((res) => res.json())
      .then((data) => setTenant(data))
      .catch(() => {
        setTenant({
          company_name: "CarShowroom SaaS",
          email: "support@carshowroomsaas.com",
          phone: "+880-123-456789",
          address: "Dhaka, Bangladesh",
          social: {},
        });
      });
  }, []);

  const currentYear = new Date().getFullYear();
  const name = tenant?.company_name || "CarShowroom SaaS";
  const email = tenant?.email || "support@carshowroomsaas.com";
  const phone = tenant?.phone || "+880-123-456789";
  const address = tenant?.address || "Dhaka, Bangladesh";
  const social = tenant?.social || {};

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
          <p className="text-sm">
            Cloud-powered platform to manage your car dealership with ease.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: {email}</li>
            <li>Phone: {phone}</li>
            <li>{address}</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
            {/* <NewsletterForm subdomain={subdomain} /> */}
            <NewsletterForm subdomain="driveeasy" />
          {/* <h3 className="text-white text-sm font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-2">Stay up to date with updates</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form> */}
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            {social.facebook && (
              <a href={social.facebook} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {currentYear} {name}. All rights reserved.
      </div>
    </footer>
  );
}
