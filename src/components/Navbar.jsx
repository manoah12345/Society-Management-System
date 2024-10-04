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
    <nav className="h-[70px] w-full bg-black flex justify-between items-center px-6 text-white shadow-lg top-0 z-50">
      {/* Navbar Title */}
      <div className="flex items-center">
        <h1 className="font-bold text-2xl text-white transition duration-300 hover:text-gray-300 cursor-pointer">
          Society Management
        </h1>
      </div>

      {/* Navbar Links */}
      <div className="flex items-center space-x-6 text-lg">
        <Link to="/">
          <h3 className="transition duration-300 hover:text-gray-400">Home</h3>
        </Link>

        <Link to="/profile/detail">
          <CgProfile className="text-3xl transition duration-300 hover:text-gray-400 cursor-pointer" />
        </Link>

        <Link to="/about">
          <h3 className="transition duration-300 hover:text-gray-400">About</h3>
        </Link>

        <button
          onClick={logOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-500"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
