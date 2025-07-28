import React from "react";

const CarList = ({ cars, selectedCarInfo, onSelectCar }) => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 rounded-xl shadow-xl p-6">
    <h3 className="font-bold mb-6 text-xl text-blue-700 tracking-wide border-b-2 border-blue-100 pb-3">Car List</h3>
    <ul className="divide-y divide-blue-100">
      {cars.map((car) => (
        <li
          key={car.id}
          className={`flex items-center justify-between px-4 py-3 my-2 rounded-lg transition-all duration-150
            cursor-pointer
            ${selectedCarInfo?.id === car.id
              ? "bg-blue-200 text-blue-900 font-bold shadow-lg ring-2 ring-blue-400"
              : "hover:bg-blue-50 text-gray-700"}`}
          onClick={() => onSelectCar(car)}
        >
          <span className="truncate">{car.name}</span>
          {selectedCarInfo?.id === car.id && (
            <span className="ml-3 px-3 py-1 text-xs bg-blue-600 text-white rounded-full shadow">Selected</span>
          )}
        </li>
      ))}
      {cars.length === 0 && (
        <li className="text-gray-400 text-center py-6">No cars found.</li>
      )}
    </ul>
  </div>
);

export default CarList;