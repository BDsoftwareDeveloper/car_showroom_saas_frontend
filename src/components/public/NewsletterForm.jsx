import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function NewsletterForm({ subdomain }) {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tenant_subdomain: subdomain }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to subscribe");

      toast.success("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </>
  );
}
