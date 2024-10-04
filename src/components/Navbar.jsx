import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="neumorphic-navbar h-[70px] w-full flex justify-between items-center px-4 text-gray-900 bg-black shadow-md" style={{ boxShadow: "0 4px 15px rgba(0, 5, 0, 0.7)" }}>
      {/* Navbar Title */}
      <h1 className="font-bold text-2xl text-white">Society Management System</h1>

      {/* Navbar Links */}
      <div className="flex space-x-6">
        <Link to="/" className="shadow-md px-4 py-2 rounded-lg hover:shadow-lg transition">
          Home
        </Link>
        <Link to="/profile/detail" className="shadow-md p-2 rounded-full hover:shadow-lg transition">
          <CgProfile className="text-3xl" />
        </Link>
        <Link to="/about" className="shadow-md px-4 py-2 rounded-lg hover:shadow-lg transition">
          About
        </Link>
        <button
          className="shadow-md px-4 py-2 bg-red-700 text-white rounded-xl hover:bg-red-600 hover:shadow-lg transition"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
