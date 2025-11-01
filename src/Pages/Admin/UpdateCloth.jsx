import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
        <div className="flex justify-center items-center min-h-screen bg-[#EAF4F6] p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl"
            >
                <h2 className="text-2xl font-bold text-center text-[#023545] mb-6">
                    Update Cloth
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
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
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
                            <input
                                key={size}
                                type="number"
                                placeholder={`${size} count`}
                                value={stockCount[size] || ""}
                                onChange={(e) =>
                                    setStockCount({ ...stockCount, [size]: e.target.value })
                                }
                                className="border border-gray-300 rounded-lg p-2"
                            />
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-[#023545] font-medium mb-2">
                        Upload New Image (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-40 h-40 object-cover rounded-lg"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#023545] text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition"
                >
                    {loading ? "Updating..." : "Update Cloth"}
                </button>
            </form>
        </div>
    );
};

export default UpdateCloth;
