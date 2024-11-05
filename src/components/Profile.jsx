import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import Chatbox from "./Chatbox";

function Profile() {
  const email = auth?.currentUser?.email;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
          setError("Failed to load user data. Please try again later.");
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // User not authenticated
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#E2E3E5] flex flex-col items-center">
      {/* Profile Section */}
      <div
        className="w-[90vw] sm:w-[50vw] flex flex-col items-center justify-center gap-4 mt-8 p-6"
        style={{
          borderRadius: "50px",
          background: "#e0e0e0",
          boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
        }}
      >
        <Link to="/profile/detail" aria-label="View profile details">
          <CgProfile className="text-[100px] text-gray-500 hover:text-gray-600 transition duration-300" />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          {loading
            ? "Loading..."
            : userData?.displayName || "No Name Available"}
        </h1>
        <p className="text-gray-500">{email || "No email available"}</p>

        {/* Info Table */}
        <div className="w-full bg-gray-100 shadow-md rounded-lg mt-6 p-6">
          <table className="w-full text-lg text-left table-fixed">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-600">Flat No.</td>
                <td className="py-2 text-gray-800 text-center">
                  {loading
                    ? "Loading..."
                    : userData?.flatNo || "No Flat Number"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-gray-600">Role</td>
                <td className="py-2 text-gray-800 text-center">
                  {loading
                    ? "Loading..."
                    : userData?.role || "No Role Available"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>

      {/* Chatbox Section */}
      <div className="w-full mt-10">
        <Chatbox />
      </div>
    </div>
  );
}

export default Profile;
