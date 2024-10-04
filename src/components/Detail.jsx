import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import Chatbox from "./Chatbox";

function Detail() {
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="h-full w-full p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        Resident Details
      </h1>
      <div className="h-[80%] w-full bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Name</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.displayName : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Birthdate</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.birthdate : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Age</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.age : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Gender</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.gender : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Occupation</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.occupation : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Phone No.</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.phoneNumber : "Loading..."}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Email</label>
            <p className="border rounded p-2 bg-gray-50 text-gray-800">
              {userData ? userData.email : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <button className="w-full h-12 mt-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500 transition duration-200">
        Edit Info
      </button>
      <Chatbox />
    </div>
  );
}

export default Detail;
