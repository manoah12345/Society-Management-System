import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-full w-[16vw] bg-[#E2E3E5] border-r-2 border-gray-700 flex flex-col justify-around items-center pb-14 text-xl text-white">
      {/* Society Name */}
      <h3 className="text-2xl font-bold text-black mb-8">[Society Name]</h3>

      {/* Profile Link */}
      <Link
        className="h-[100px] w-[180px] flex items-center justify-center p-2 rounded-lg bg-gray-200 text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
        to="/profile"
      >
        Profile
      </Link>

      {/* Society Info Link */}
      <Link
        className="h-[100px] w-[180px] flex items-center justify-center p-2 rounded-lg bg-gray-200 text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
        to="/society"
      >
        Society Info
      </Link>

      {/* Members Link */}
      <Link
        className="h-[100px] w-[180px] flex items-center justify-center p-2 rounded-lg bg-gray-200 text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
        to="/members"
      >
        Members
      </Link>

      {/* Account Link */}
      <Link
        className="h-[100px] w-[180px] flex items-center justify-center p-2 rounded-lg bg-gray-200 text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
        to="/account"
      >
        Account
      </Link>

      {/* Parking Link */}
      <Link
        className="h-[100px] w-[180px] flex items-center justify-center p-2 rounded-lg bg-gray-200 text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
        to="/parking"
      >
        Parking
      </Link>
    </div>
  );
}

export default Sidebar;
