import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

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
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#604a03ff] mx-auto mb-4"></div>
                        <p className="text-lg text-[#604a03ff] font-medium">Loading inventory...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />
            
            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/adminPage")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Admin
                    </button>

                    {/* Header Card */}
                    <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/40 shadow-lg">
                        <h1 className="text-4xl font-bold text-center text-[#604a03ff]">
                            Cloth Inventory
                        </h1>
                        <p className="text-center text-gray-600 mt-2">
                            Manage and view all clothing items in your inventory
                        </p>
                    </div>

                    {/* Table Card */}
                    {clothes.length === 0 ? (
                        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 border border-white/40 shadow-lg text-center">
                            <p className="text-gray-600 text-lg">No clothes found in inventory.</p>
                        </div>
                    ) : (
                        <div className="bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/40 shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-[#604a03ff]/80 to-[#af8314ff]/80 text-white">
                                            <th className="p-4 text-left text-sm font-semibold">Image</th>
                                            <th className="p-4 text-left text-sm font-semibold">Cloth Name</th>
                                            <th className="p-4 text-left text-sm font-semibold">Price (Rs)</th>
                                            <th className="p-4 text-left text-sm font-semibold">Type</th>
                                            <th className="p-4 text-left text-sm font-semibold">Sizes</th>
                                            <th className="p-4 text-left text-sm font-semibold">Stock</th>
                                            <th className="p-4 text-center text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clothes.map((cloth) => (
                                            <tr key={cloth.id} className="border-b border-white/30 hover:bg-white/20 transition duration-200">
                                                <td className="p-4">
                                                    <img
                                                        src={cloth.imageUrl}
                                                        alt={cloth.clothName}
                                                        className="w-20 h-20 object-cover rounded-lg border border-white/40"
                                                    />
                                                </td>
                                                <td className="p-4 font-semibold text-gray-800">{cloth.clothName}</td>
                                                <td className="p-4 text-gray-700 font-medium">Rs. {cloth.price}</td>
                                                <td className="p-4 text-gray-700">{cloth.clothType}</td>
                                                <td className="p-4 text-gray-700 text-sm">
                                                    {cloth.sizes && cloth.sizes.length > 0 
                                                        ? cloth.sizes.join(", ") 
                                                        : "N/A"}
                                                </td>
                                                <td className="p-4 text-gray-700 text-sm">
                                                    {cloth.stockCount
                                                        ? Object.entries(cloth.stockCount)
                                                            .map(([size, count]) => `${size}: ${count}`)
                                                            .join(", ")
                                                        : "N/A"}
                                                </td>
                                                <td className="p-4 flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => navigate(`/updateCloth/${cloth.id}`)}
                                                        className="bg-[#604a03ff] text-white px-3 py-2 rounded-lg hover:bg-[#af8314ff] transition font-medium text-sm shadow-md"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cloth.id)}
                                                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm shadow-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DisplayCloth;
