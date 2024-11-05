import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation(); // Get the current location to determine active link

  return (
    <div className="h-full w-[14%] bg-[#E2E3E5] border-r-2 border-gray-700 flex flex-col justify-around items-center pb-14 text-xl text-black">
      {/* Society Name */}
      <h3 className="text-2xl font-bold mb-8">UNIQUE</h3>

      {/* Dynamic Link Component */}
      {["Profile", "Society Info", "Members", "Account", "Parking"].map(
        (text, index) => {
          const isActive =
            location.pathname === `/${text.replace(" ", "").toLowerCase()}`; // Check if the link is active
          return (
            <Link
              key={index}
              className={`flex items-center justify-center w-[10vw] p-4 rounded-lg text-red-700 font-bold mb-4 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:bg-[#e8e8e8] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff] overflow-hidden ${
                isActive ? "bg-gray-300" : "bg-gray-200"
              }`} // Change background color for active link
              to={`/${text.replace(" ", "").toLowerCase()}`}
              aria-label={text} // Accessibility label
            >
              {/* Optionally add an icon here */}
              {text}
            </Link>
          );
        }
      )}
    </div>
  );
}

export default Sidebar;
