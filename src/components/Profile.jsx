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
    <div className="min-h-screen w-full bg-[#E2E3E5] flex flex-col items-center">
      {/* Profile Section */}
      <div
        className="w-[50vw] flex flex-col items-center justify-center gap-4 mt-8 p-6"
        style={{
          borderRadius: "50px",
          background: "#e0e0e0",
          boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
        }}
      >
        <Link to="/profile/detail">
          <CgProfile className="text-[100px] text-gray-500 hover:text-gray-600 transition duration-300" />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          {userData ? userData.displayName : "Loading..."}
        </h1>
        <p className="text-gray-500">{email}</p>

        {/* Info Table */}
        <div className="w-full bg-gray-100 shadow-md rounded-lg mt-6 p-6">
          <table className="w-full text-lg text-left table-fixed">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-600">Flat No.</td>
                <td className="py-2 text-gray-800 text-center">
                  {userData ? userData.flatNo : "Loading..."}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-600">Role</td>
                <td className="py-2 text-gray-800 text-center">
                  {userData ? userData.role : "Loading..."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chatbox Section */}
      <div className="w-full mt-10">
        <Chatbox />
      </div>
    </div>
  );
}

export default Profile;
