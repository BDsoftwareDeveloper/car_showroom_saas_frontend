import { useSearchParams } from "react-router-dom";

export default function NotifyMe() {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get("carId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6">Get Notified</h2>
        <form>
          <input type="hidden" name="carId" value={carId || ""} />
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-yellow-400" type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-yellow-400" type="email" name="email" required />
          </div>
          <button className="w-full py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow hover:bg-yellow-500 transition" type="submit">
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
}