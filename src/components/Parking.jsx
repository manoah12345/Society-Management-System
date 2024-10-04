import React, { useState } from "react";
import Chatbox from "./Chatbox";

const parkingDataInitial = [
  {
    id: 1,
    occupant: "Alice",
    vehicle: "Car",
    isOccupied: true,
    isSelected: false,
  },
  {
    id: 2,
    occupant: "Bob",
    vehicle: "Bike",
    isOccupied: true,
    isSelected: false,
  },
  { id: 3, occupant: "", vehicle: "", isOccupied: false, isSelected: false },
  { id: 4, occupant: "", vehicle: "", isOccupied: false, isSelected: false },
  {
    id: 5,
    occupant: "Charlie",
    vehicle: "Cycle",
    isOccupied: true,
    isSelected: false,
  },
  { id: 6, occupant: "", vehicle: "", isOccupied: false, isSelected: false },
  {
    id: 7,
    occupant: "Eve",
    vehicle: "Car",
    isOccupied: true,
    isSelected: false,
  },
  { id: 8, occupant: "", vehicle: "", isOccupied: false, isSelected: false },
];

const Parking = () => {
  const [parkingData, setParkingData] = useState(parkingDataInitial);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newOccupant, setNewOccupant] = useState("");
  const [newVehicle, setNewVehicle] = useState("");

  const applyForParking = () => {
    if (
      !selectedSlot ||
      newOccupant.trim() === "" ||
      newVehicle.trim() === ""
    ) {
      alert(
        "Please select a parking slot and enter occupant and vehicle information."
      );
      return;
    }

    const updatedParkingData = parkingData.map((slot) => {
      if (slot.id === selectedSlot) {
        return {
          ...slot,
          occupant: newOccupant,
          vehicle: newVehicle,
          isOccupied: true,
          isSelected: false, // Reset selection after applying
        };
      }
      return slot;
    });

    setParkingData(updatedParkingData);
    setSelectedSlot(null);
    setNewOccupant("");
    setNewVehicle("");
  };

  const removeVehicle = (slotId) => {
    const updatedParkingData = parkingData.map((slot) => {
      if (slot.id === slotId) {
        return {
          ...slot,
          occupant: "",
          vehicle: "",
          isOccupied: false,
          isSelected: false,
        };
      }
      return slot;
    });

    setParkingData(updatedParkingData);
  };

  const toggleSelectSlot = (slotId) => {
    const updatedParkingData = parkingData.map((slot) => {
      if (slot.id === slotId) {
        return { ...slot, isSelected: !slot.isSelected }; // Toggle selection
      }
      return { ...slot, isSelected: false }; // Deselect other slots
    });

    setParkingData(updatedParkingData);
    setSelectedSlot(slotId);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        Parking Information
      </h1>

      {/* Apply for Parking Space */}
      <div className="mb-6 flex flex-col md:flex-row items-center">
        <label htmlFor="occupant" className="mr-2 text-black">
          Occupant Name:
        </label>
        <input
          type="text"
          id="occupant"
          value={newOccupant}
          onChange={(e) => setNewOccupant(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mr-4 shadow-md"
        />
        <label htmlFor="vehicle" className="ml-4 text-black">
          Vehicle:
        </label>
        <input
          type="text"
          id="vehicle"
          value={newVehicle}
          onChange={(e) => setNewVehicle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mr-4 shadow-md"
        />
        <button
          onClick={applyForParking}
          className="bg-red-600 text-white px-5 py-2 rounded-md shadow-lg transition duration-200 hover:bg-red-700"
        >
          Apply for Parking
        </button>
      </div>

      {/* Parking Diagram */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {parkingData.map((slot) => (
          <div
            key={slot.id}
            className={`w-24 h-24 flex flex-col items-center justify-center text-center border border-gray-400 rounded-md shadow-lg cursor-pointer ${
              slot.isOccupied
                ? "bg-red-600 text-white"
                : slot.isSelected
                ? "bg-green-400 text-black" // Change color when selected
                : "bg-green-500 text-black"
            }`}
            onClick={() => toggleSelectSlot(slot.id)} // Toggle selection on click
          >
            {slot.isOccupied ? (
              <div>
                <span className="font-medium">
                  {slot.occupant}
                  <br />({slot.vehicle}) <br />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering slot selection
                    removeVehicle(slot.id);
                  }}
                  className="bg-red-800 text-white text-xs rounded-md mt-1 p-1 border border-red-900 transition duration-200 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className="font-semibold text-black">Empty</span>
            )}
          </div>
        ))}
      </div>

      {/* Occupancy Table */}
      <table className="w-full max-w-4xl border-collapse border border-gray-400 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-400 px-4 py-2">Slot ID</th>
            <th className="border border-gray-400 px-4 py-2">Occupant</th>
            <th className="border border-gray-400 px-4 py-2">Vehicle</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {parkingData.map((slot) => (
            <tr key={slot.id} className="hover:bg-gray-200">
              <td className="border border-gray-400 px-4 py-2 text-center">
                {slot.id}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {slot.isOccupied ? slot.occupant : "Available"}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {slot.isOccupied ? slot.vehicle : "N/A"}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {slot.isOccupied ? "Occupied" : "Empty"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Chatbox />
    </div>
  );
};

export default Parking;
