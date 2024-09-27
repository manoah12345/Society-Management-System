import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config'; // Adjust this to your Firebase config location

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch members from Firestore
    const fetchAllMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const membersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMembers(membersData); // Set the data in the state
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchAllMembers();
  }, []);

  return (
    <div className="h-full w-[82%] py-3 px-5 flex justify-center text-lg">
      <div className='h-full'>
        <div className="grid grid-cols-5 auto-rows-min w-full max-w-8xl border-2 bg-white border-black p-2">
          {/* Table Headers */}
          <div className="border border-black p-4 font-semibold text-2xl">No.</div>
          <div className="border border-black p-4 font-semibold text-2xl">Name</div>
          <div className="border border-black p-4 font-semibold text-2xl">Flat No</div>
          <div className="border border-black p-4 font-semibold text-2xl">Role</div>
          <div className="border border-black p-4 font-semibold text-2xl">Date of Joining</div>

          {/* Table Rows - dynamically create rows based on members */}
          {members.map((member, index) => (
            <React.Fragment key={member.id}>
              <div className="border border-black p-4">{index + 1}</div>
              <div className="border border-black p-4">{member.displayName}</div>
              <div className="border border-black p-4">{member.flatNo}</div>
              <div className="border border-black p-4">{member.role}</div>
              <div className="border border-black p-4">{new Date(member.createdAt.seconds * 1000).toLocaleDateString()}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
