import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";

export default function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRole, setEditingRole] = useState({}); // track role changes

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
            <div className="flex justify-center items-center h-screen text-lg text-gray-700">
                Loading user data...
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );

    return (
        <div>
            <Navbar />
            <div className="p-8 bg-gray-50 min-h-screen mt-17">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                        User Details
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr
                                        key={user.id || index}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="px-6 py-3 text-sm text-gray-700">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-700">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-700">
                                            <select
                                                value={editingRole[user.id] || user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(user.id, e.target.value)
                                                }
                                                className={`border rounded-lg p-1 focus:ring-2 ${
                                                    user.role === "ADMIN"
                                                        ? "border-red-400 text-red-600"
                                                        : "border-green-400 text-green-600"
                                                }`}
                                            >
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-3 text-center space-x-2">
                                            <button
                                                onClick={() => handleUpdateRole(user.id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            >
                                                Update Role
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.username)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500 italic"
                                    >
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
