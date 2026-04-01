import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../../services/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminAPI.getUsers();
      if (!result.success) throw new Error(`Error: ${result.error}`);
      setUsers(result.data);
    } catch (err) {
      setError("Failed to load users");
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (userName) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const result = await adminAPI.deleteUser(userName);
      if (!result.success) throw new Error();
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error)   return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!users.length) return <p className="text-center mt-10">No users found</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Users</h1>
      <table className="w-full bg-gray-800 text-white text-center border-collapse">
        <thead>
          <tr>
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
            <th className="p-3">Plan</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userName} className="border-b hover:bg-gray-700">
              <td className="py-3">{u.userName}</td>
              <td className="py-3">{u.email}</td>
              <td className="py-3">{u.currentPlan?.title || "No Plan"}</td>
              <td className="py-3">{u.isPaid ? "Paid" : "Trial"}</td>
        <td className="py-3 flex justify-center gap-2">
                <Link to={`/admin/userProfile/${u.userName}`}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white">
                  View
                </Link>
                <button onClick={() => deleteUser(u.userName)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;