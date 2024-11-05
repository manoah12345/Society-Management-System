import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";
import Chatbox from "./Chatbox";

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const rolePriority = {
          chairman: 1,
          secretary: 2,
          treasurer: 3,
          member: 4,
        };

        const sortedMembers = membersData.sort((a, b) => {
          const roleA = rolePriority[a.role.toLowerCase()] || Infinity; // Default to Infinity if role not found
          const roleB = rolePriority[b.role.toLowerCase()] || Infinity;

          if (roleA !== roleB) {
            return roleA - roleB;
          }
          return a.flatNo - b.flatNo;
        });

        setMembers(sortedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Failed to load members. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAllMembers();
  }, []);

  return (
    <div className="min-h-screen w-full py-10 px-5 flex flex-col items-center bg-[#E2E3E5]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Members List</h1>

      {/* Loading and Error States */}
      {loading && <p className="text-lg text-gray-500">Loading members...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && members.length === 0 && (
        <p className="text-lg text-gray-500">No members found.</p>
      )}

      {/* Table */}
      {!loading && members.length > 0 && (
        <div
          className="w-full max-w-6xl p-6"
          style={{
            borderRadius: "50px",
            background: "#e0e0e0",
            boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
          }}
        >
          <div className="grid grid-cols-5 auto-rows-min w-full border border-gray-300 rounded overflow-hidden">
            {/* Table Headers */}
            <div className="border-b border-gray-300 bg-gray-200 p-4 font-semibold text-lg text-gray-700 text-center">
              No.
            </div>
            <div className="border-b border-gray-300 bg-gray-200 p-4 font-semibold text-lg text-gray-700">
              Name
            </div>
            <div className="border-b border-gray-300 bg-gray-200 p-4 font-semibold text-lg text-gray-700 text-center">
              Flat No
            </div>
            <div className="border-b border-gray-300 bg-gray-200 p-4 font-semibold text-lg text-gray-700 text-center">
              Role
            </div>
            <div className="border-b border-gray-300 bg-gray-200 p-4 font-semibold text-lg text-gray-700 text-center">
              Date of Joining
            </div>

            {/* Table Rows */}
            {members.map((member, index) => (
              <React.Fragment key={member.id}>
                <div className="border-b border-gray-200 p-4 text-center">
                  {index + 1}
                </div>
                <div className="border-b border-gray-200 p-4">
                  {member.displayName}
                </div>
                <div className="border-b border-gray-200 p-4 text-center">
                  {member.flatNo}
                </div>
                <div className="border-b border-gray-200 p-4 text-center capitalize">
                  {member.role}
                </div>
                <div className="border-b border-gray-200 p-4 text-center">
                  {member.createdAt
                    ? new Date(
                        member.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 w-full max-w-6xl">
        <Chatbox />
      </div>
    </div>
  );
}

export default Members;
