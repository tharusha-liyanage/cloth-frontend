import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/homecarousel/add";

const AddSlideModal = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image!");
            return;
        }

        if (!title.trim()) {
            alert("Please enter a title!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("image", image);

        try {
            setLoading(true);
            await axios.post(API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Slide added successfully!");
            navigate("/adminCarousel");
        } catch (err) {
            console.error("Error adding slide:", err);
            alert("Failed to add slide. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />

            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/adminCarousel")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Carousel
                    </button>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Form Card */}
                        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-lg">
                            <h2 className="text-3xl font-bold text-[#604a03ff] mb-2">
                                Add New Slide
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Create a new carousel slide for your homepage
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-[#604a03ff] font-semibold mb-2">
                                        Slide Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter slide title"
                                        className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        This text will be prominently displayed on the slide
                                    </p>
                                </div>

                                {/* Subtitle */}
                                <div>
                                    <label className="block text-[#604a03ff] font-semibold mb-2">
                                        Slide Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter slide subtitle (optional)"
                                        className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff] focus:bg-white transition"
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Secondary text displayed below the title
                                    </p>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-[#604a03ff] font-semibold mb-2">
                                        Slide Image *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="image-input"
                                            required
                                        />
                                        <label
                                            htmlFor="image-input"
                                            className="block w-full bg-white/50 border-2 border-dashed border-white/60 rounded-lg p-6 text-center cursor-pointer hover:bg-white/70 hover:border-[#604a03ff] transition"
                                        >
                                            <Upload className="mx-auto mb-2 text-[#604a03ff]" size={28} />
                                            <p className="font-semibold text-gray-700">Click to upload image</p>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                        </label>
                                    </div>
                                    {image && (
                                        <p className="text-sm text-green-600 font-medium mt-2">
                                            ✓ {image.name} selected
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white font-semibold py-3 rounded-lg hover:opacity-95 transition disabled:opacity-60 shadow-md"
                                    >
                                        {loading ? "Adding..." : "Add Slide"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/adminCarousel")}
                                        className="flex-1 bg-white/50 border border-white/60 text-[#604a03ff] font-semibold py-3 rounded-lg hover:bg-white/70 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Preview Card */}
                        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-lg">
                            <h3 className="text-2xl font-bold text-[#604a03ff] mb-6">
                                Preview
                            </h3>

                            {preview ? (
                                <div className="space-y-4">
                                    <div className="relative overflow-hidden rounded-2xl bg-gray-200 h-96 shadow-lg border border-white/40">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm border border-white/60">
                                        <h4 className="text-lg font-bold text-[#604a03ff] truncate">
                                            {title || "Slide Title"}
                                        </h4>
                                        <p className="text-gray-700 text-sm mt-1 truncate">
                                            {subtitle || "Slide subtitle will appear here"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 bg-white/20 rounded-2xl border-2 border-dashed border-white/40">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-[#f6f2ea] rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg
                                                className="w-8 h-8 text-[#604a03ff]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 font-medium">
                                            Upload an image to see preview
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Info Box */}
                            <div className="mt-6 bg-blue-50/50 border border-blue-200/50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">💡 Tips</h4>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• Use high-quality images for better appearance</li>
                                    <li>• Recommended size: 1920x600px or similar aspect ratio</li>
                                    <li>• Keep title concise and descriptive</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddSlideModal;
