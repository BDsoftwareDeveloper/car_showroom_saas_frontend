import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const CarInfo = ({ car, onEdit, onDelete }) => (
  <div className="bg-gradient-to-br from-white via-blue-50 to-gray-100 rounded-xl shadow-xl p-6">
    <h3 className="font-bold mb-6 text-xl text-blue-700 tracking-wide border-b-2 border-blue-100 pb-3">Car Info</h3>
    {car ? (
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-full md:w-64 h-40 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-2xl text-blue-900 mb-2">{car.name}</h3>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">Price:</span> <span className="text-blue-700">${car.price}</span></p>
            <p><span className="font-medium">Stock:</span> <span className="text-green-700">{car.stock}</span></p>
            <p><span className="font-medium">Status:</span> <span className="text-purple-700 capitalize">{car.status}</span></p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onEdit(car)}
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              <Pencil size={18} /> Edit
            </button>
            <button
              onClick={() => onDelete(car.id)}
              className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-gray-400 text-center py-12">Select a car from the list to view details.</div>
    )}
  </div>
);

export default CarInfo;