import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import Chatbox from "./Chatbox";

function Profile() {
  const email = auth?.currentUser?.email;
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
    <div className="h-full w-full">
      <div className="w-full h-[300px] bg-white flex flex-col items-center justify-center gap-3">
        <Link to="/profile/detail">
          <CgProfile className="text-[120px]" />
        </Link>
        <h1 className="text-3xl">
          {userData ? userData.displayName : <p>Loading.....</p>}
        </h1>
      </div>
      <div className="w-[86vw] h-[40%] bg-blue-400 flex justify-center items-center text-[30px]">
        <table className="border-2 border-black h-[50%] w-[32%] bg-white">
          <tr className="border-2 border-black">
            <td className="border-2 border-black text-center">Flat No.</td>
            <td className="text-center">
              {userData ? userData.flatNo : <p>Loading.....</p>}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-black text-center">Role</td>
            <td className="text-center">
              {userData ? userData.role : <p>Loading.....</p>}
            </td>
          </tr>
        </table>
      </div>
      <Chatbox />
    </div>
  );
}

export default Profile;
