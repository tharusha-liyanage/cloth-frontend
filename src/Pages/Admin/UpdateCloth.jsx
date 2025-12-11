import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_BASE = "http://localhost:8080/api/clothes";

const UpdateCloth = () => {
    const { id } = useParams(); // ✅ Get cloth ID from URL
    const navigate = useNavigate();

    const [clothName, setClothName] = useState("");
    const [price, setPrice] = useState("");
    const [clothType, setClothType] = useState("");
    const [sizes, setSizes] = useState([]);
    const [stockCount, setStockCount] = useState({
        XS: "",
        S: "",
        M: "",
        L: "",
        XL: "",
        XXL: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    // ✅ Load existing data
    useEffect(() => {
        const fetchCloth = async () => {
            try {
                const res = await axios.get(`${API_BASE}/id/${id}`);
                const data = res.data;
                setClothName(data.clothName);
                setPrice(data.price);
                setClothType(data.clothType);
                setSizes(data.sizes || []);
                setStockCount(data.stockCount || {});
                setPreview(data.imageUrl);
            } catch (err) {
                console.error("Error fetching cloth:", err);
                alert("Failed to load cloth data.");
            }
        };
        fetchCloth();
    }, [id]);

    // ✅ Handle size toggle
    const handleSizeChange = (size) => {
        setSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };

    // ✅ Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("clothName", clothName);
        formData.append("price", price);
        formData.append("clothType", clothType);
        sizes.forEach((size) => formData.append("sizes", size));

        Object.entries(stockCount).forEach(([size, count]) => {
            if (count) formData.append(`stockCount[${size}]`, count);
        });

        if (image) formData.append("image", image);

        try {
            setLoading(true);
            await axios.put(`${API_BASE}/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Cloth updated successfully!");
            navigate("/displayCloth");
        } catch (err) {
            console.error("Error updating cloth:", err);
            alert("Failed to update cloth. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />
            
            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/displayCloth")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Inventory
                    </button>

                    {/* Form Card */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-lg"
                    >
                        <h2 className="text-3xl font-bold text-center text-[#604a03ff] mb-8">
                            Update Cloth Details
                        </h2>

                        {/* Cloth Name */}
                        <div className="mb-6">
                            <label className="block text-[#604a03ff] font-semibold mb-2">
                                Cloth Name
                            </label>
                            <input
                                type="text"
                                value={clothName}
                                onChange={(e) => setClothName(e.target.value)}
                                required
                                className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition"
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <label className="block text-[#604a03ff] font-semibold mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition"
                            />
                        </div>

                        {/* Cloth Type */}
                        <div className="mb-6">
                            <label className="block text-[#604a03ff] font-semibold mb-2">
                                Cloth Type
                            </label>
                            <select
                                value={clothType}
                                onChange={(e) => setClothType(e.target.value)}
                                required
                                className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition"
                            >
                                <option value="">Select Type</option>
                                <option value="denim">Denim</option>
                                <option value="officeWear">Office Wear</option>
                                <option value="frock">Frock</option>
                                <option value="newArrival">New Arrival</option>
                                <option value="topWear">Top Wear</option>
                            </select>
                        </div>

                        {/* Sizes */}
                        <div className="mb-6">
                            <label className="block text-[#604a03ff] font-semibold mb-3">
                                Available Sizes
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {allSizes.map((size) => (
                                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={sizes.includes(size)}
                                            onChange={() => handleSizeChange(size)}
                                            className="w-5 h-5 rounded accent-[#604a03ff]"
                                        />
                                        <span className="font-medium text-gray-700">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Stock Count */}
                        <div className="mb-6">
                            <label className="block text-[#604a03ff] font-semibold mb-3">
                                Stock Count (per size)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {allSizes.map((size) => (
                                    <input
                                        key={size}
                                        type="number"
                                        placeholder={`${size} count`}
                                        value={stockCount[size] || ""}
                                        onChange={(e) =>
                                            setStockCount({ ...stockCount, [size]: e.target.value })
                                        }
                                        className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition text-sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-8">
                            <label className="block text-[#604a03ff] font-semibold mb-2">
                                Upload New Image (optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                                className="w-full bg-white/50 border border-white/60 border-dashed rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] transition"
                            />
                            {preview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 font-semibold mb-2">Preview:</p>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-lg border-2 border-white/60 shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white font-semibold py-3 rounded-lg hover:opacity-95 transition disabled:opacity-60 shadow-lg"
                        >
                            {loading ? "Updating..." : "Update Cloth"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UpdateCloth;
