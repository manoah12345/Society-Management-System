import React from "react";
import Chatbox from "./Chatbox";

function SocietyInfo() {
  return (
    <div className="h-full w-full py-8 px-8 bg-[#E2E3E5] flex flex-col items-center">
      {/* Title Section */}
      <h1 className="text-[40px] font-bold text-gray-800 mb-1">
        Unique Society
      </h1>
      <h3 className="text-lg text-gray-600 mb-6">C-63</h3>

      {/* Info Grid */}
      <div
        className="w-full max-w-4xl p-6 grid grid-cols-2 gap-4"
        style={{
          borderRadius: "50px",
          background: "#e0e0e0",
          boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
        }}
      >
        <h3 className="text-center font-semibold text-gray-700 border-b pb-2">
          No. of Blocks
        </h3>
        <p className="text-left text-gray-800 border-b pb-2 pl-3">20</p>

        <h3 className="text-center font-semibold text-gray-700 border-b pb-2">
          Updated Info
        </h3>
        <p className="text-left text-gray-800 border-b pb-2 pl-3">15/06/2024</p>

        <h3 className="text-center font-semibold text-gray-700 border-b pb-2">
          Address
        </h3>
        <p className="text-left text-gray-800 border-b pb-2 pl-3">
          Sec-10, Near SVP park, Shanti Nagar
        </p>

        <h3 className="text-center font-semibold text-gray-700 border-b pb-2">
          City
        </h3>
        <p className="text-left text-gray-800 border-b pb-2 pl-3">
          Mira-Bhayandar
        </p>

        <h3 className="text-center font-semibold text-gray-700">State</h3>
        <p className="text-left text-gray-800 pl-3">Maharashtra</p>
      </div>

      {/* Chatbox Section */}
      <div className="mt-10 w-full">
        <Chatbox />
      </div>
    </div>
  );
}

export default SocietyInfo;
