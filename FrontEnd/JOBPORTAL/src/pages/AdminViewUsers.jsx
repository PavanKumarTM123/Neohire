import { useState, useEffect } from "react";

export default function AdminViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7278/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete a user by ID
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`https://localhost:7278/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers(); // Refresh user list after deletion
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">User Management</h2>

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">User List</h3>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-sm sm:text-base">
            <thead className="bg-blue-600 text-white">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Login Type</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.userId}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-gray-800 hover:bg-blue-50 transition-all`}
                >
                  <td className="border border-gray-300 px-4 py-2">{user.userId}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.gmail}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {parseInt(user.logginAs) === 1
                      ? "User"
                      : parseInt(user.logginAs) === 2
                      ? "Recruiter"
                      : parseInt(user.logginAs) === 3
                      ? "Admin"
                      : "Unknown"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => deleteUser(user.userId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
