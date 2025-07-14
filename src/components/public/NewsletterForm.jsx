// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function NewsletterForm({ subdomain }) {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/public/subscribe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, tenant_subdomain: subdomain }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Failed to subscribe");

//       toast.success("✅ Subscribed successfully!");
//       setEmail("");
//     } catch (err) {
//       toast.error(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-gray-400"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700"
//         >
//           Subscribe
//         </button>
//       </form>
//       <ToastContainer position="bottom-right" />
//     </>
//   );
// }



// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function NewsletterForm({ subdomain }) {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setLoading(true);
//     try {
//       const res = await fetch("/api/public/subscribe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, tenant_subdomain: subdomain }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.detail || "Subscription failed");

//       toast.success("✅ Subscribed successfully!");
//       setEmail("");
//     } catch (err) {
//       toast.error(`❌ ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubscribe}
//         className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
//         aria-label="Newsletter subscription form"
//       >
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           aria-label="Email address"
//           className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading || !email}
//           className={`bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition ${
//             loading ? "opacity-60 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Subscribing..." : "Subscribe"}
//         </button>
//       </form>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </>
//   );
// }


import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import 'react-toastify/dist/ReactToastify.css';

export default function NewsletterForm({ subdomain }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await axios.post("/public/subscribe", {
        email,
        tenant_subdomain: subdomain,
      });

      toast.success("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.msg ||
        err.message ||
        "Subscription failed";
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        aria-label="Newsletter subscription form"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className={`bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}
