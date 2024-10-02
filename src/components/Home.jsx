import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import Chatbox from "./Chatbox";
import Notice from "./Notice"; // Import the Notice component
import { auth } from "../config/firebase-config"; // Import auth to get the current user

function Home() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [userRole, setUserRole] = useState(null); // State to store user role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setTotalMembers(querySnapshot.size);
    };

    const fetchUserRole = async () => {
      const userId = auth.currentUser?.uid; // Get the current user ID
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId)); // Fetch user document
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role); // Assume 'role' is the field name in Firestore
        } else {
          console.error("No such user document!");
        }
      } else {
        console.error("User is not authenticated.");
      }
    };

    fetchTotalUsers();
    fetchUserRole();
  }, []);

  const handleTotalMembersClick = () => {
    navigate("/members");
  };

  return (
    <div className="h-full w-full flex flex-col py-3 items-center">
      {/* Container for statistics */}
      <div className="flex justify-around w-full mb-4">
        {" "}
        {/* Added margin-bottom */}
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

      {/* Spacer to push notices to the middle of the page */}
      <div className="flex-grow"></div>

      {/* Separate container for Notice component */}
      <div className="flex items-center justify-center w-[80vw] h-full">
        <div className="max-h-[60vh] w-full overflow-auto">
          {" "}
          {/* Set max height and enable scrolling if needed */}
          <Notice role={userRole} /> {/* Passing the role dynamically */}
        </div>
      </div>

      {/* Separate container for Chatbox */}
      <div className="flex justify-center items-center w-full mt-4">
        {" "}
        {/* Added margin-top */}
        <Chatbox />
      </div>
    </div>
  );
}

export default Home;
