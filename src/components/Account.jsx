import React, { useState, useEffect } from "react";
import Chatbox from "./Chatbox";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockBills = [
    {
      id: 1,
      type: "Parking",
      amount: 500,
      dueDate: "2024-11-15",
      status: "Paid",
    },
    {
      id: 2,
      type: "Electricity",
      amount: 1200,
      dueDate: "2024-11-10",
      status: "Pending",
    },
    {
      id: 3,
      type: "Maintenance",
      amount: 300,
      dueDate: "2024-11-20",
      status: "Overdue",
    },
    {
      id: 4,
      type: "Water",
      amount: 400,
      dueDate: "2024-11-05",
      status: "Paid",
    },
    {
      id: 5,
      type: "Internet",
      amount: 800,
      dueDate: "2024-11-25",
      status: "Pending",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setError("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setError("Failed to load user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("User not authenticated.");
      }
    };
    fetchUserData();
  }, []);

  const handlePayBill = (billId) => {
    alert(`Bill with ID ${billId} has been paid!`);
  };

  // Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader"></div>
      </div>
    );
  }

  // Error Handling
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="h-full w-full bg-[#E2E3E5] p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Overview</h1>

      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-semibold">User Details</h2>
        {userData ? (
          <>
            <p className="mt-2">
              <strong>Name:</strong> {userData.displayName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {auth.currentUser.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {userData.role || "N/A"}
            </p>
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </div>

      {/* Bills Table Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Your Bills</h2>
        {mockBills.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Bill Type</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Due Date</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{bill.type}</td>
                  <td className="border px-4 py-2">{`₹${bill.amount}`}</td>
                  <td className="border px-4 py-2">{bill.dueDate}</td>
                  <td
                    className={`border px-4 py-2 ${
                      bill.status === "Paid"
                        ? "text-green-600"
                        : bill.status === "Overdue"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {bill.status}
                  </td>
                  <td className="border px-4 py-2">
                    {(bill.status === "Pending" ||
                      bill.status === "Overdue") && (
                      <button
                        onClick={() => handlePayBill(bill.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
                      >
                        Pay Bill
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">No bills available.</div>
        )}
      </div>

      <Chatbox />
    </div>
  );
};

export default Account;
