import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Sidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user/group
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

        // Add the static group chat "Society" at the beginning
        const societyGroup = { id: "society-group", displayName: "Society" };

        // Ensure the "Society" group is at the top
        setUsers([societyGroup, ...filteredUsers]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [currentUserId]);

  // Function to handle user/group selection
  const handleUserSelect = (user) => {
    setSelectedUser(user.id); // Track the selected user/group by id
    onUserSelect(user); // Call the parent function to notify about the selected user/group
  };

  return (
    <div className="w-1/4 h-[95%] bg-gray-300 p-4 border-r border-gray-300 rounded-tl-[5px] rounded-bl-[5px]">
      {/* Sidebar Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Active Chats</h2>
      </div>

      {/* User List */}
      <ul className="space-y-4">
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            {index === 1 && ( // Insert a divider after the "Society" group
              <hr className="my-2 border-gray-400" />
            )}
            <li
              onClick={() => handleUserSelect(user)} // Handle user/group selection
              className={`flex items-center justify-between p-2 rounded-lg shadow-md cursor-pointer transition duration-200 ${
                selectedUser === user.id
                  ? "bg-blue-200" // Highlight selected user/group
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              <div>
                <span className="block text-sm font-medium">
                  {user.displayName}
                </span>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
