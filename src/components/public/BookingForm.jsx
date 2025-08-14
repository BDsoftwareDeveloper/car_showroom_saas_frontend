export default function BookingForm({ form, loading, success, error, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Your Name</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400"
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400"
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Preferred Time</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400"
          type="text"
          name="preferred_time"
          required
          value={form.preferred_time}
          onChange={handleChange}
        />
      </div>

      <button
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Booking"}
      </button>

      {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </form>
  );
}
