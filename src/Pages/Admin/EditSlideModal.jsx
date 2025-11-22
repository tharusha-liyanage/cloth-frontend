import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8080/api/homecarousel";

const EditSlideModel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        loadSlide();
    }, []);

    const loadSlide = async () => {
        const res = await axios.get(`${API_URL}/${id}`);
        setTitle(res.data.title);
        setSubtitle(res.data.subtitle);
        setPreview(res.data.imageUrl);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("subtitle", subtitle);
        if (image) formData.append("image", image);

        await axios.put(`${API_URL}/update/${id}`, formData);

        alert("Slide updated successfully!");
        navigate("/adminCarousel");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
            >
                <h1 className="text-3xl font-bold text-[#023545] mb-6 text-center">
                    Edit Carousel Slide
                </h1>

                {/* Image Preview */}
                <div className="flex justify-center mb-5">
                    <img
                        src={preview}
                        alt="preview"
                        className="w-72 h-40 object-cover rounded-xl shadow-md border"
                    />
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#023545]"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Subtitle
                        </label>
                        <input
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#023545]"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Change Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border p-2 rounded-lg shadow-sm"
                        />
                    </div>

                    <button
                        className="w-full bg-[#023545] text-white py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-[#03415a] transition-all duration-200"
                    >
                        Update Slide
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/adminCarousel")}
                        className="w-full mt-3 border text-gray-700 py-3 rounded-lg shadow hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditSlideModel;
