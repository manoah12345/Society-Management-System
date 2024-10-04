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
    if (!selectedSlot || newOccupant.trim() === "" || newVehicle.trim() === "") {
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
    <div className="min-h-screen w-full bg-[#E2E3E5] p-4 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Parking Information
        </h1>

        {/* Apply for Parking Space - Input and Button Card */}
        <div
          className="mb-6 w-full max-w-6xl p-6"
          style={{
            borderRadius: "50px",
            background: "#e0e0e0",
            boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Occupant Input */}
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <label htmlFor="occupant" className="mr-2 text-black">
                Occupant Name:
              </label>
              <input
                type="text"
                id="occupant"
                value={newOccupant}
                onChange={(e) => setNewOccupant(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 mr-4 shadow-md"
                placeholder="Enter name"
              />
            </div>

            {/* Vehicle Input */}
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <label htmlFor="vehicle" className="ml-4 text-black">
                Vehicle:
              </label>
              <input
                type="text"
                id="vehicle"
                value={newVehicle}
                onChange={(e) => setNewVehicle(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 mr-4 shadow-md"
                placeholder="Enter vehicle type"
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={applyForParking}
              className="bg-red-600 text-white px-5 py-2 rounded-md shadow-lg transition duration-200 hover:bg-red-700"
            >
              Apply for Parking
            </button>
          </div>
        </div>

        {/* Parking Slots - Neumorphic Card */}
        <div
          className="w-full max-w-6xl p-6 mb-6"
          style={{
            borderRadius: "50px",
            background: "#e0e0e0",
            boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Parking Slots
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {parkingData.map((slot) => (
              <div
                key={slot.id}
                className={`w-24 h-24 flex flex-col items-center justify-center text-center border border-gray-400 rounded-md shadow-lg cursor-pointer transition duration-200 ${
                  slot.isOccupied
                    ? "bg-red-600 text-white"
                    : slot.isSelected
                    ? "bg-green-400 text-black"
                    : "bg-green-500 text-black"
                }`}
                onClick={() => toggleSelectSlot(slot.id)}
              >
                {slot.isOccupied ? (
                  <div>
                    <span className="font-medium">
                      {slot.occupant}
                      <br />({slot.vehicle})
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering slot selection
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
        </div>

        {/* Occupancy Table - Neumorphic Card */}
        <div
          className="w-full max-w-6xl p-6"
          style={{
            borderRadius: "50px",
            background: "#e0e0e0",
            boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Occupancy Details
          </h2>
          <table className="w-full border-collapse border border-gray-400 shadow-lg">
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
        </div>

        {/* Chatbox Section */}
        <div className="mt-10 w-full max-w-6xl">
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default Parking;
