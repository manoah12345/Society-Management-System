import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { FiUser } from "react-icons/fi"; // Importing a user icon

const Sidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true while fetching
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
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchUsers();
  }, [currentUserId]);

  const handleUserSelect = (user) => {
    setSelectedUser(user.id);
    onUserSelect(user);
  };

  return (
    <div className="w-full md:w-1/4 h-[95%] bg-gray-200 p-4 border-r border-gray-400 rounded-tl-lg rounded-bl-lg shadow-md">
      {/* Sidebar Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Active Chats</h2>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              {index === 1 && <hr className="my-2 border-gray-300" />}
              <li
                onClick={() => handleUserSelect(user)}
                className={`flex items-center p-3 rounded-lg transition duration-200 ${
                  selectedUser === user.id
                    ? "bg-red-200" // Change to red when selected
                    : "bg-white hover:bg-red-100" // Change hover effect to red
                } shadow-sm`}
              >
                <FiUser className="mr-3 text-gray-700" /> {/* User icon */}
                <div className="flex-1">
                  <span className="block text-sm font-medium text-gray-800">
                    {user.displayName}
                  </span>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
