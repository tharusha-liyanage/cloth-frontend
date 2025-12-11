import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";
import { ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:8080/api/clothes/add";

const AddClothForm = () => {
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
    const [loading, setLoading] = useState(false);

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    // ✅ handle checkbox toggle
    const handleSizeChange = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };

    // ✅ handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image!");
            return;
        }

        const numericPrice = Number(price);
        const numericStockCount = Object.fromEntries(
            Object.entries(stockCount)
                .filter(([_, value]) => value !== "")
                .map(([size, value]) => [size, Number(value)])
        );

        // 🧩 Debugging check (remove later)
        console.log("Final stockCount sent:", numericStockCount);

        const formData = new FormData();
        formData.append("clothName", clothName);
        formData.append("price", numericPrice);
        formData.append("clothType", clothType);

        // append selected sizes
        sizes.forEach((size) => formData.append("sizes", size));

        // append stock counts safely
        Object.entries(numericStockCount).forEach(([size, count]) => {
            formData.append(`stockCount[${size}]`, count);
        });

        formData.append("image", image);

        try {
            setLoading(true);
            const res = await axios.post(API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Cloth added successfully!");

            // ✅ Redirect based on clothType
            switch (clothType.toLowerCase()) {
                case "denim":
                    navigate("/denim");
                    break;
                case "officewear":
                    navigate("/officeWear");
                    break;
                case "frock":
                    navigate("/frock");
                    break;
                case "newarrival":
                    navigate("/newArrival");
                    break;
                case "topwear":
                    navigate("/topWear");
                    break;
                default:
                    navigate("/");
            }
        } catch (err) {
            console.error("Error uploading cloth:", err);
            alert("Failed to add cloth. Please try again.");
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
                        onClick={() => navigate("/adminPage")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Admin
                    </button>

                    {/* Form Card */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-[#fbdfaeff] shadow-lg"
                    >
                        <h2 className="text-3xl font-bold text-center text-[#604a03ff] mb-8">
                            Add New Cloth
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
                            <label className="block text-[#604a03ff] font-semibold mb-2">Price</label>
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
                                    <div key={size}>
                                        <input
                                            type="number"
                                            placeholder={`${size} count`}
                                            value={stockCount[size]}
                                            onChange={(e) =>
                                                setStockCount({
                                                    ...stockCount,
                                                    [size]: e.target.value,
                                                })
                                            }
                                            className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-8">
                            <label className="block text-[#604a03ff] font-semibold mb-2">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full bg-white/50 border border-white/60 border-dashed rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] transition"
                            />
                            {image && (
                                <p className="text-sm text-green-600 font-medium mt-2">
                                    ✓ {image.name} selected
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white font-semibold py-3 rounded-lg hover:opacity-95 transition disabled:opacity-60 shadow-lg"
                        >
                            {loading ? "Uploading..." : "Add Cloth"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddClothForm;
