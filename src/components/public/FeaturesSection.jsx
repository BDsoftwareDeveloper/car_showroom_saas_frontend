export default function FeaturesSection() {
  const features = [
    { icon: "🚗", title: "Car Inventory" },
    { icon: "👥", title: "Customer & Staff" },
    { icon: "📊", title: "Sales Tracking" },
    { icon: "🌐", title: "Multi-Tenant Setup" },
  ];

  return (
    <section id="features" className="bg-white py-16 px-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map(({ icon, title }) => (
          <div key={title} className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-md">
            <div className="text-4xl mb-4">{icon}</div>
            <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
