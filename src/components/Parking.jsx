import React, { useState, useEffect } from "react";
import Chatbox from "./Chatbox";
import { db } from "../config/firebase-config";
import { getDoc, setDoc, doc } from "firebase/firestore";

const Parking = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newOccupant, setNewOccupant] = useState("");
  const [newVehicle, setNewVehicle] = useState("");
  const [loadingAction, setLoadingAction] = useState(false); // Loading state for actions
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const initializeParkingData = async () => {
      try {
        const parkingCollection = Array.from({ length: 8 }, (_, index) => ({
          id: `Slot-${index + 1}`,
          isOccupied: false,
          occupant: "",
          vehicle: "",
          isSelected: false,
        }));

        const fetchedData = await Promise.all(
          parkingCollection.map(async (slot) => {
            const slotRef = doc(db, "parkingData", slot.id);
            const slotSnapshot = await getDoc(slotRef);

            if (slotSnapshot.exists()) {
              return { id: slot.id, ...slotSnapshot.data() };
            } else {
              await setDoc(slotRef, slot);
              return slot;
            }
          })
        );

        setParkingData(fetchedData);
      } catch (error) {
        console.error("Error fetching parking data:", error);
        setError("Failed to load parking data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initializeParkingData();
  }, []);

  const applyForParking = async () => {
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

    setLoadingAction(true); // Start loading action
    setError(""); // Reset error

    try {
      const updatedParkingData = parkingData.map((slot) => {
        if (slot.id === selectedSlot) {
          return {
            ...slot,
            occupant: newOccupant,
            vehicle: newVehicle,
            isOccupied: true,
            isSelected: false,
          };
        }
        return slot;
      });

      setParkingData(updatedParkingData);
      setSelectedSlot(null);
      setNewOccupant("");
      setNewVehicle("");

      const selectedSlotRef = doc(db, "parkingData", selectedSlot);
      await setDoc(
        selectedSlotRef,
        {
          occupant: newOccupant,
          vehicle: newVehicle,
          isOccupied: true,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating parking data:", error);
      setError("Failed to apply for parking. Please try again.");
    } finally {
      setLoadingAction(false); // Stop loading action
    }
  };

  const removeVehicle = async (slotId) => {
    if (window.confirm("Are you sure you want to remove the vehicle?")) {
      setLoadingAction(true); // Start loading action
      setError(""); // Reset error

      try {
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

        const slotRef = doc(db, "parkingData", slotId);
        await setDoc(
          slotRef,
          {
            occupant: "",
            vehicle: "",
            isOccupied: false,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error removing vehicle:", error);
        setError("Failed to remove vehicle. Please try again.");
      } finally {
        setLoadingAction(false); // Stop loading action
      }
    }
  };

  const toggleSelectSlot = (slotId) => {
    const updatedParkingData = parkingData.map((slot) => {
      if (slot.id === slotId) {
        return { ...slot, isSelected: !slot.isSelected };
      }
      return { ...slot, isSelected: false };
    });

    setParkingData(updatedParkingData);
    setSelectedSlot(slotId);
  };

  return (
    <div className="min-h-screen w-full bg-[#E2E3E5] p-4 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Parking Information
        </h1>

        {loading ? (
          <p>Loading parking slots...</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message */}
            <div
              className="mb-6 w-full max-w-6xl p-6"
              style={{
                borderRadius: "50px",
                background: "#e0e0e0",
                boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
              }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
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
                <button
                  onClick={applyForParking}
                  disabled={loadingAction} // Disable button while loading
                  className={`bg-red-600 text-white px-5 py-2 rounded-md shadow-lg transition duration-200 ${
                    loadingAction
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                >
                  {loadingAction ? "Applying..." : "Apply for Parking"}
                </button>
              </div>
            </div>
            <div
              className="h-full flex flex-col items-center justify-center max-w-6xl p-6 px-12 mb-6"
              style={{
                borderRadius: "50px",
                background: "#e0e0e0",
                boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Parking Slots
              </h2>
              <div className="grid grid-cols-4 gap-x-[100px] gap-y-6 justify-center items-center">
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
                        <br />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
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
                    <th className="border border-gray-400 px-4 py-2">
                      Slot ID
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Occupant
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Vehicle
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {parkingData.map((slot) => (
                    <tr key={slot.id} className="text-center">
                      <td className="border border-gray-400 px-4 py-2">
                        {slot.id}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {slot.occupant || "-"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {slot.vehicle || "-"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {slot.isOccupied ? "Occupied" : "Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Chatbox />
    </div>
  );
};

export default Parking;
