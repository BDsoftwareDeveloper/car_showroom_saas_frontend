// import { Link } from "react-router-dom";

// export default function HeroSection() {
//   return (
//     <section
//       className="bg-gradient-to-b from-white to-gray-50 px-4 py-20 sm:py-24 lg:py-32 text-center"
//       aria-labelledby="hero-title"
//     >
//       <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
//         <h2
//           id="hero-title"
//           className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
//         >
//           Modern Car Showroom Management
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
//           A complete cloud solution to manage cars, sales, customers, and your staff — built for dealerships of all sizes.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link
//             to="/signup"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Get Started
//           </Link>
//           <a
//             href="#features"
//             className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Learn More
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }




import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function HeroSection({ heroTitle, heroSubtitle, ctaText, ctaLink }) {
  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50 px-4 py-20 sm:py-24 lg:py-32 text-center"
      aria-labelledby="hero-title"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h2
          id="hero-title"
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
        >
          {heroTitle}
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
          {heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {ctaLink && (
            <Link
              to={ctaLink}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ctaText}
            </Link>
          )}
          <a
            href="#features"
            className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  heroTitle: PropTypes.string.isRequired,
  heroSubtitle: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
};

