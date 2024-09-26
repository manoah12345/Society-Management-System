import React from 'react';

function Members() {
  return (
    <div className="h-full w-[82%] py-3 px-5 flex justify-center text-lg">
     <div className='h-full'>
      <div className="grid grid-cols-5 h-[40%] w-full max-w-8xl border-2 bg-white border-black p-2">
    
        <div className="border border-black p-4 font-semibold text-2xl">Name</div>
        <div className="border border-black p-4 font-semibold text-2xl">Flat No</div>
        <div className="border border-black p-4 font-semibold text-2xl">No.</div>
        <div className="border border-black p-4 font-semibold text-2xl">Role</div>
        <div className="border border-black p-4 font-semibold text-2xl">Date of Joining</div>
        
        
        <div className="border border-black p-4">1</div>
        <div className="border border-black p-4">Test</div>
        <div className="border border-black p-4">101</div>
        <div className="border border-black p-4">Chairman</div>
        <div className="border border-black p-4">26th Sept 2024</div>
        
        <div className="border border-black p-4">2</div>
        <div className="border border-black p-4">Glavin Lobo</div>
        <div className="border border-black p-4">201</div>
        <div className="border border-black p-4">Member</div>
        <div className="border border-black p-4">26th Sept 2024</div>

        </div>
      </div>
    </div>
  );
}

export default Members;
