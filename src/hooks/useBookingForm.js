import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export function useBookingForm() {
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("car_id"));
  const tenant_subdomain = searchParams.get("subdomain") || window.location.hostname.split('.')[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    preferred_time: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        
        ...form,
        car_id: carId,
        tenant_subdomain,
        // created_at: new Date().toISOString(),
      };

      await api.post("/public/book-test-drive", payload);
      setSuccess("Your booking request has been submitted!");
      setForm({ name: "", email: "", preferred_time: "", status: "pending" });
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    success,
    error,
    handleChange,
    handleSubmit,
  };
}




// export function useBookingForm(car) {
//   const [searchParams] = useSearchParams();
//   const tenant_subdomain =
//     searchParams.get("subdomain") || window.location.hostname.split('.')[0];

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     preferred_time: "",
//     status: "pending",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const payload = {
//         ...form,
//         car_id: car?.id,
//         // car_name: car?.name,
//         tenant_subdomain,
//         created_at: new Date().toISOString(),
//       };

//       await api.post("/public/book-test-drive", payload);
//       setSuccess("Your booking request has been submitted!");
//       setForm({ name: "", email: "", preferred_time: "", status: "pending" });
//     } catch (err) {
//       setError("Failed to submit booking. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     form,
//     loading,
//     success,
//     error,
//     handleChange,
//     handleSubmit,
//   };
// }
