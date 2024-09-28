import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import Chatbox from "./Chatbox";

function Home() {
  const [totalMembers, setTotalMembers] = useState(0);
  const navigate = useNavigate();

  // Fetch total number of users (members) from Firestore
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Get all documents from the 'users' collection
        setTotalMembers(querySnapshot.size); // Set the total number of users
      } catch (error) {
        console.error("Error fetching total members:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  const handleTotalMembersClick = () => {
    navigate("/members"); // Redirect to the /members page
  };

  return (
    <div className="h-full w-[82%] flex flex-col justify-around py-3 items-start">
      {/* Existing content */}
      <div className="flex justify-around w-full">
        <div className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200">
          Total number of Vehicles
        </div>
        <div
          className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleTotalMembersClick}
        >
          Total Members: {totalMembers}
        </div>
        <div className="px-10 py-7 border rounded bg-white cursor-pointer hover:bg-gray-100 transition duration-200">
          Remaining empty Blocks
        </div>
      </div>
      <Chatbox />
    </div>
  );
}

export default Home;
