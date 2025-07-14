// import "../../styles/FeaturesSection.css";
// export default function FeaturesSection() {
//   const features = [
//     { icon: "🚗", title: "Car Inventory" },
//     { icon: "👥", title: "Customer & Staff" },
//     { icon: "📊", title: "Sales Tracking" },
//     { icon: "🌐", title: "Multi-Tenant Setup" },
//   ];

//   return (
//     <section
//       id="features"
//       className="bg-white py-16 px-6"
//       aria-labelledby="features-heading"
//       role="region"
//     >
//       <h3
//         id="features-heading"
//         className="text-3xl font-bold text-center text-gray-800 mb-12"
//       >
//         Key Features
//       </h3>

//       <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
//         {features.map(({ icon, title }) => (
//           <div
//             key={title}
//             className="bg-gray-100 p-6 rounded-xl text-center shadow transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg"
//             tabIndex={0}
//             aria-label={title}
//           >
//             <div className="text-5xl mb-4" aria-hidden="true">
//               {icon}
//             </div>
//             <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



export default function FeaturesSection() {
  const features = [
    { icon: "🚗", title: "Car Inventory", description: "Easily manage and update your car listings." },
    { icon: "👥", title: "Customer & Staff", description: "Keep track of customer interactions and staff performance." },
    { icon: "📊", title: "Sales Tracking", description: "Monitor your sales metrics in real-time." },
    { icon: "🌐", title: "Multi-Tenant Setup", description: "Host multiple dealerships with isolated data." },
  ];

  return (
    <section
      id="features"
      className="bg-white py-16 px-6"
      aria-labelledby="features-heading"
    >
      <h3
        id="features-heading"
        className="text-3xl font-extrabold text-center text-gray-800 mb-12"
      >
        Key Features
      </h3>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-center shadow-sm hover:shadow-md focus-within:shadow-md transition"
            tabIndex={0}
            aria-label={title}
          >
            <div className="text-5xl mb-4" aria-hidden="true">
              {icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              {title}
            </h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
