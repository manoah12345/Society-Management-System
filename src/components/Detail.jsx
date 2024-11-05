import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import Chatbox from "./Chatbox";

function Detail() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fieldLabels = {
    displayName: "Name",
    birthdate: "Birthdate",
    age: "Age",
    gender: "Gender",
    occupation: "Occupation",
    phoneNumber: "Phone No.",
    email: "Email",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (user && userData) {
      try {
        await updateDoc(doc(db, "users", user.uid), userData);
        setIsEditing(false); // Exit editing mode after saving
        console.log("User data updated successfully");
      } catch (error) {
        console.error("Error updating user data:", error.message);
      }
    }
  };

  return (
    <div className="h-full w-full p-5 bg-[#E2E3E5]">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        Resident Details
      </h1>
      <div className="h-[80%] w-full bg-[#E2E3E5] rounded-lg shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] p-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(fieldLabels).map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-semibold text-gray-600">
                {fieldLabels[field]}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={userData ? userData[field] : ""}
                  onChange={handleInputChange}
                  className="border rounded p-2 bg-gray-50 text-gray-800"
                />
              ) : (
                <p className="border rounded p-2 bg-gray-50 text-gray-800">
                  {userData ? userData[field] : "Loading..."}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {isEditing ? (
        <button
          onClick={handleSaveChanges}
          className="w-full h-12 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition duration-200"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full h-12 mt-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500 transition duration-200"
        >
          Edit Info
        </button>
      )}
      <Chatbox />
    </div>
  );
}

export default Detail;
