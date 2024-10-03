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
    <div className="h-[70px] w-full bg-gray-900 flex justify-between items-center px-4 text-white shadow-lg">
      {/* Navbar Title */}
      <h1 className="font-bold text-2xl text-red-500">Society Management System</h1>

      {/* Navbar Links */}
      <div className="h-full w-1/3 flex justify-around items-center text-lg">
        <Link to="/">
          <h3 className="h-[50px] w-[100px] flex items-center justify-center p-2 rounded hover:bg-gray-700 transition duration-200">
            Home
          </h3>
        </Link>
        <Link to="/profile/detail">
          <CgProfile className="text-3xl hover:text-gray-400 transition duration-200" />
        </Link>
        <Link to="/about">
          <h3 className="h-[50px] w-[100px] flex items-center justify-center p-2 rounded hover:bg-gray-700 transition duration-200">
            About
          </h3>
        </Link>
        <h3
          className="h-[50px] w-[100px] flex items-center justify-center p-2 rounded bg-red-600 hover:bg-red-500 transition duration-200 cursor-pointer"
          onClick={logOut}
        >
          Log Out
        </h3>
      </div>
    </div>
  );
}

export default Navbar;
