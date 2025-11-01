import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className="flex justify-center items-center min-h-screen bg-[#EAF4F6] p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl"
            >
                <h2 className="text-2xl font-bold text-center text-[#023545] mb-6">
                    Add New Cloth
                </h2>

                {/* Cloth Name */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Cloth Name
                    </label>
                    <input
                        type="text"
                        value={clothName}
                        onChange={(e) => setClothName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Cloth Type */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Cloth Type
                    </label>
                    <select
                        value={clothType}
                        onChange={(e) => setClothType(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
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
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {allSizes.map((size) => (
                            <label key={size} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={sizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Stock Count */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Stock Count (per size)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
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
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-[#023545] font-medium mb-2">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#023545] text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition"
                >
                    {loading ? "Uploading..." : "Add Cloth"}
                </button>
            </form>
        </div>
    );
};

export default AddClothForm;
