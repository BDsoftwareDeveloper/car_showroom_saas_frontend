import { useEffect, useState } from "react";
import api from "../../api/axios"; // Adjust if placed differently

export default function AdminContactMessages({ tenant }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/admin/contact-messages", {
          params: { tenant_subdomain: tenant },
        });
        setMessages(response.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError(err.response?.data?.detail || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    if (tenant) {
      fetchMessages();
    }
  }, [tenant]);

  if (!tenant) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-red-600">
        ⚠️ Tenant subdomain is not provided.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      <a
        href={`/api/v1/admin/contact-messages/export?tenant_subdomain=${tenant}`}
        className="text-sm text-blue-600 underline"
      >
        ⬇️ Export CSV
      </a>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Message</th>
                <th className="border px-3 py-2 text-left">Car ID</th>
                <th className="border px-3 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, idx) => (
                <tr key={idx}>
                  <td className="border px-3 py-2">{msg.name}</td>
                  <td className="border px-3 py-2">{msg.email}</td>
                  <td className="border px-3 py-2">{msg.message}</td>
                  <td className="border px-3 py-2">{msg.car_id || "-"}</td>
                  <td className="border px-3 py-2 text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
