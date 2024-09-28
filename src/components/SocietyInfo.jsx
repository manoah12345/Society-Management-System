import React from "react";
import Chatbox from "./Chatbox";

function SocietyInfo() {
  return (
    <div className="h-full w-[82%] py-3 px-5">
      <h1 className="text-[40px] text-center">Unique</h1>
      <h3 className="text-center mb-2">C-65</h3>
      <div className="h-[70%] w-full bg-white rounded grid grid-cols-[150px,auto] grid-rows-5 p-2">
        <h3 className="text-center border border-black">No of Blocks</h3>
        <h3 className="px-1 border border-black">20</h3>
        <h3 className="text-center border border-black">Updated Info</h3>
        <h3 className="px-1 border border-black">15/06/2024</h3>
        <h3 className="text-center border border-black">Address</h3>
        <h3 className="px-1 border border-black">
          Sec-10, Near SVP park, Shanti Nagar
        </h3>
        <h3 className="text-center border border-black">City</h3>
        <h3 className="px-1 border border-black">Mira-Bhayandar</h3>
        <h3 className="text-center border border-black">State</h3>
        <h3 className="px-1 border border-black">Maharashta</h3>
      </div>
      <Chatbox />
    </div>
  );
}

export default SocietyInfo;
