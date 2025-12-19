import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRole, setEditingRole] = useState({});
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getAllUser");
      if (res.data.code === "00" || res.status === 202) {
        setUsers(res.data.content || []);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, username) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user "${username}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8080/deleteUser/${id}`);
      if (res.data.code === "00" || res.status === 202) {
        alert("User deleted successfully!");
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user.");
    }
  };

  const handleRoleChange = (id, newRole) => {
    setEditingRole((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleUpdateRole = async (id) => {
    const newRole = editingRole[id];
    if (!newRole) return;

    try {
      const res = await axios.put(`http://localhost:8080/updateUserRole/${id}`, {
        role: newRole,
      });
      if (res.data.code === "00" || res.status === 202) {
        alert("User Role updated successfully!");
        fetchUsers();
      } else {
        alert("Failed to update user role.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating role.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-[#604a03ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#604a03ff] mx-auto mb-4"></div>
          Loading user data...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          {error}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      {/* Navbar Spacer */}
      <div className="h-[76px] md:h-[72px]" />

      <div className="p-4 sm:p-8 bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50 flex-1">
        <div className="max-w-6xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate("/adminPage")}
            className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
          >
            <ArrowLeft size={20} />
            Back to Admin
          </button>

          {/* Header Card */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-6 border border-white/40 shadow-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#604a03ff]">
              Manage Users
            </h1>
            <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
              View, edit roles, and manage registered users
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/40 shadow-lg overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#604a03ff]/80 to-[#af8314ff]/80 text-white text-sm sm:text-base">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">User Role</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="border-b border-white/30 hover:bg-white/20 transition duration-200"
                    >
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 font-medium">{index + 1}</td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 font-medium">{user.username}</td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-700 break-all">{user.email}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">
                        <select
                          value={editingRole[user.id] || user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-white/80 backdrop-blur-sm border-2 font-semibold focus:outline-none focus:ring-2 transition text-sm sm:text-base ${
                            (editingRole[user.id] || user.role) === "ADMIN"
                              ? "border-red-400 text-red-600 focus:ring-red-300"
                              : "border-green-400 text-green-600 focus:ring-green-300"
                          }`}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 flex flex-col sm:flex-row justify-center items-center gap-2">
                        <button
                          onClick={() => handleUpdateRole(user.id)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-[#604a03ff] text-white rounded-lg hover:bg-[#af8314ff] transition duration-200 font-medium shadow-md text-sm sm:text-base w-full sm:w-auto"
                        >
                          Update Role
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.username)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-[#960404ff] text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium shadow-md text-sm sm:text-base w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500 italic text-sm sm:text-base">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
