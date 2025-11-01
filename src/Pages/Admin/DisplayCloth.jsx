import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/clothes";

const DisplayCloth = () => {
    const [clothes, setClothes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Fetch all clothes on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/allcloth`);
                setClothes(res.data);
            } catch (err) {
                console.error("Error fetching clothes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ✅ Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this cloth?")) {
            try {
                await axios.delete(`${API_URL}/delete/${id}`);
                alert("Cloth deleted successfully!");
                setClothes(clothes.filter((c) => c.id !== id));
            } catch (err) {
                console.error("Error deleting cloth:", err);
                alert("Failed to delete cloth!");
            }
        }
    };

    // ✅ Navigate to Update page
    const handleUpdate = (id) => {
        navigate(`/updateCloth/${id}`);
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg text-gray-700">Loading clothes...</div>;
    }

    return (
        <div className="p-6 bg-[#EAF4F6] min-h-screen">
            <h1 className="text-3xl font-bold text-center text-[#023545] mb-8">
                Cloth Inventory
            </h1>

            {clothes.length === 0 ? (
                <p className="text-center text-gray-600">No clothes found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-[#023545] text-white">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Cloth Name</th>
                            <th className="p-3 text-left">Price (Rs)</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Sizes</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clothes.map((cloth) => (
                            <tr key={cloth.id} className="border-b hover:bg-gray-100">
                                <td className="p-3">
                                    <img
                                        src={cloth.imageUrl}
                                        alt={cloth.clothName}
                                        className="w-20 h-20 object-cover rounded-lg border"
                                    />
                                </td>
                                <td className="p-3 font-medium text-gray-800">{cloth.clothName}</td>
                                <td className="p-3 text-gray-700">{cloth.price}</td>
                                <td className="p-3 text-gray-700">{cloth.clothType}</td>
                                <td className="p-3 text-gray-700">
                                    {cloth.sizes && cloth.sizes.join(", ")}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {cloth.stockCount
                                        ? Object.entries(cloth.stockCount)
                                            .map(([size, count]) => `${size}: ${count}`)
                                            .join(", ")
                                        : "N/A"}
                                </td>
                                <td className="p-3 flex gap-3 justify-center">
                                    <button
                                        onClick={() => navigate(`/updateCloth/${cloth.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                    >
                                        📝 Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cloth.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DisplayCloth;
