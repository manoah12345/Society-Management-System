import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Sidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, "users");
        const usersSnapshot = await getDocs(userCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredUsers = usersList.filter(
          (user) => user.id !== currentUserId
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [currentUserId]);

  return (
    <div className="w-1/4 h-[95%] bg-gray-300 p-4 border-r border-gray-300 rounded-tl-[5px] rounded-bl-[5px]">
      {/* Sidebar Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Active Chats</h2>
      </div>

      {/* User List */}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onUserSelect(user)} // Handle user selection
            className="flex items-center justify-between p-2 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200"
          >
            <div>
              <span className="block text-sm font-medium">
                {user.displayName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
