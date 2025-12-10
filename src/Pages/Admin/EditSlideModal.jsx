import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/homecarousel";

const EditSlideModel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSlide();
    }, [id]);

    const loadSlide = async () => {
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            setTitle(res.data.title || "");
            setSubtitle(res.data.subtitle || "");
            setPreview(res.data.imageUrl || "");
        } catch (err) {
            console.error("Error loading slide:", err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        if (image) formData.append("image", image);

        try {
            setLoading(true);
            await axios.put(`${API_URL}/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Slide updated successfully!");
            navigate("/adminCarousel");
        } catch (err) {
            console.error("Error updating slide:", err);
            alert("Failed to update slide. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />

            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate("/adminCarousel")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Carousel
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/30 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-lg"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-[#604a03ff] mb-6 text-center">
                            Edit Carousel Slide
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <form onSubmit={handleUpdate} className="space-y-5">
                                    <div>
                                        <label className="block text-[#604a03ff] font-semibold mb-2">Title</label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#604a03ff] font-semibold mb-2">Subtitle</label>
                                        <input
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            className="w-full bg-white/50 border border-white/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#604a03ff] font-semibold mb-2">Change Image</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                id="edit-image-input"
                                                className="hidden"
                                            />
                                            <label htmlFor="edit-image-input" className="block w-full bg-white/50 border-2 border-dashed border-white/60 rounded-lg p-4 text-center cursor-pointer hover:bg-white/70 hover:border-[#604a03ff] transition">
                                                <Upload className="mx-auto mb-2 text-[#604a03ff]" size={22} />
                                                <div className="font-semibold text-gray-700">Click to select a new image</div>
                                                <div className="text-xs text-gray-500 mt-1">Optional — leave empty to keep current image</div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white py-3 rounded-lg font-semibold shadow-md">
                                            {loading ? "Updating..." : "Update Slide"}
                                        </button>

                                        <button type="button" onClick={() => navigate("/adminCarousel")} className="flex-1 bg-white/50 border border-white/60 text-[#604a03ff] py-3 rounded-lg font-semibold">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="md:col-span-1">
                                <div className="text-center">
                                    <div className="relative overflow-hidden rounded-2xl bg-gray-200 h-56 mb-4 border border-white/40 shadow-md">
                                        {preview ? (
                                            <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                                        )}
                                    </div>

                                    <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm border border-white/60">
                                        <h4 className="text-lg font-bold text-[#604a03ff] truncate">{title || "Slide Title"}</h4>
                                        <p className="text-gray-700 text-sm mt-1 truncate">{subtitle || "Slide subtitle"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditSlideModel;
