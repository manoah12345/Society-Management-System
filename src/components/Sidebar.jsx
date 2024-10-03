import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-full w-[14%] bg-red-600 border-r-2 border-gray-700 flex flex-col justify-around items-center pb-14 text-xl text-white">
      {/* Society Name */}
      <h3 className="text-2xl font-bold text-white mb-8">[Society Name]</h3>
      
      {/* Profile Link */}
      <Link
        className="h-[70px] w-[150px] flex items-center justify-center px-3 py-1 rounded border border-transparent hover:border-gray-300 hover:bg-red-500 transition duration-200"
        to="/profile"
      >
        Profile
      </Link>

      {/* Society Info Link */}
      <Link
        className="h-[70px] w-[150px] flex items-center justify-center px-3 py-1 rounded border border-transparent hover:border-gray-300 hover:bg-red-500 transition duration-200"
        to="/society"
      >
        Society Info
      </Link>

      {/* Members Link */}
      <Link
        className="h-[70px] w-[150px] flex items-center justify-center px-3 py-1 rounded border border-transparent hover:border-gray-300 hover:bg-red-500 transition duration-200"
        to="/members"
      >
        Members
      </Link>

      {/* Account Link */}
      <Link
        className="h-[70px] w-[150px] flex items-center justify-center px-3 py-1 rounded border border-transparent hover:border-gray-300 hover:bg-red-500 transition duration-200"
      >
        Account
      </Link>

      {/* Parking Link */}
      <Link
        className="h-[70px] w-[150px] flex items-center justify-center px-3 py-1 rounded border border-transparent hover:border-gray-300 hover:bg-red-500 transition duration-200"
      >
        Parking
      </Link>
    </div>
  );
}

export default Sidebar;
