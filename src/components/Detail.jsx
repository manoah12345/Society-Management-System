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
    <div className="h-full w-full p-5">
      <h1 className="mb-5">Residents</h1>
      <div className="h-[80%] w-full bg-white rounded grid grid-cols-[150px,auto] grid-rows-7 p-2">
        <h3 className="text-center border border-black">Name</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.displayName : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Birthdate</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.birthdate : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Age</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.age : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Gender</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.gender : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Occupation</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.occupation : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Phone No.</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.phoneNumber : <p>Loading.....</p>}
        </h3>
        <h3 className="text-center border border-black">Email</h3>
        <h3 className="px-1 border border-black">
          {userData ? userData.email : <p>Loading.....</p>}
        </h3>
      </div>
      <button className="w-full h-10 border rounded bg-white text-black border-black mt-3">
        Edit Info
      </button>
      <Chatbox />
    </div>
  );
}

export default Detail;
