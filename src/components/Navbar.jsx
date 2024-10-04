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
        <svg
          width="80"
          height="80"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="95"
            cy="100"
            r="70"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <rect x="40" y="90" width="40" height="40" fill="black" />
          <polygon points="40,90 60,70 80,90" fill="red" />
          <rect x="48" y="100" width="10" height="10" fill="#fff" />

          <rect x="110" y="90" width="40" height="40" fill="black" />
          <polygon points="110,90 130,70 150,90" fill="red" />
          <rect x="118" y="100" width="10" height="10" fill="#fff" />

          <rect x="90" y="115" width="10" height="20" fill="black" />
          <circle cx="95" cy="105" r="15" fill="red" />
          <circle cx="80" cy="105" r="10" fill="red" />
          <circle cx="110" cy="105" r="10" fill="red" />
        </svg>
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
