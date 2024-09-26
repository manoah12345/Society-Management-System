import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

function Home() {
  const [totalMembers, setTotalMembers] = useState(0);

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

  return (
    <div className="h-full w-[82%] flex justify-around py-3 items-start">
      <h1 className="px-10 py-7 border rounded bg-white">
        Total number of Vehicles
      </h1>
      <h1 className="px-10 py-7 border rounded bg-white">
        Total Members: {totalMembers}
      </h1>
      <h1 className="px-10 py-7 border rounded bg-white">
        {" "}
        Remaining empty Blocks
      </h1>
    </div>
  );
}
export default Home;
