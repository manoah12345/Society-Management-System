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
    <div className="min-h-screen w-full flex flex-col py-6 items-center bg-[#E2E3E5]">
      {/* Container for statistics */}
      <div className="flex justify-around w-full mb-6">
        <div className="px-10 py-7 border rounded-xl bg-white cursor-pointer transition-all duration-300 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:bg-[#e8e8e8]">
          <p className="text-xl font-semibold text-gray-800">
            Total number of Vehicles
          </p>
        </div>
        <div
          className="px-10 py-7 border rounded-xl bg-white cursor-pointer transition-all duration-300 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
          onClick={handleTotalMembersClick}
        >
          <p className="text-xl font-semibold text-red-700">
            Total Members: {totalMembers}
          </p>
        </div>
        <div className="px-10 py-7 border rounded-xl bg-white cursor-pointer transition-all duration-300 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:bg-[#e8e8e8]">
          <p className="text-xl font-semibold text-gray-800">
            Remaining empty Blocks
          </p>
        </div>
      </div>

      {/* Spacer to push notices to the middle of the page */}
      <div className="flex-grow"></div>

      {/* Separate container for Notice component */}
      <div className="flex items-center justify-center w-[80vw] h-full mb-6">
        <div className="max-h-[60vh] w-full overflow-auto bg-[#e0e0e0] border border-[#e8e8e8] rounded-[50px] p-6 
            shadow-[12px_12px_28px_#bababa,-12px_-12px_28px_#ffffff] 
            transition-all duration-300 
            hover:shadow-[12px_12px_28px_#bababa,-12px_-12px_28px_#ffffff]
            active:shadow-[inset_4px_4px_12px_rgba(197,197,197,0.5),_inset_-4px_-4px_12px_rgba(255,255,255,0.5)]">
          <Notice role={userRole} /> {/* Passing the role dynamically */}
        </div>
      </div>

      {/* Separate container for Chatbox */}
      <div className="flex justify-center items-center w-full mt-4">
        <div className="w-[80vw] bg-gray-50 shadow-md border border-gray-200 rounded-lg p-4">
          <Chatbox />
        </div>
      </div>
    </div>
  );
}

export default Home;
