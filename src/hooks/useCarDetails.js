// src/hooks/useCarDetails.js
import { useState, useEffect } from "react";
import api from "../api/axios";

export const useCarDetails = (car_id) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/public/car-details/${car_id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [car_id]);

  return { car, loading };
};
