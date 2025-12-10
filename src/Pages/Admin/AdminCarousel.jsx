import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Plus } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/homecarousel";

const AdminCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const navigate = useNavigate();

    // Fetch all slides
    const loadSlides = async () => {
        const res = await axios.get(`${API_URL}/all`);
        setSlides(res.data);
    };

    useEffect(() => {
        loadSlides();
    }, []);

    // Delete slide
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this slide?")) return;

        await axios.delete(`${API_URL}/delete/${id}`);
        loadSlides();
    };
    const handleAddCarousel = () => {
        navigate("/addSlideModal"); 
    };

    const handleUpdateCarousel = (id) => {
    navigate(`/editSlideModal/${id}`);
};

   

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />
            
            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
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
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-[#604a03ff]">
                                    Manage Carousel Slides
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Add, edit, or delete homepage carousel slides
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-6 py-3 rounded-full font-bold text-lg">
                                {slides.length}
                            </div>
                        </div>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={handleAddCarousel}
                        className="mb-6 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-6 py-3 rounded-lg hover:opacity-95 transition font-semibold shadow-md flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add New Slide
                    </button>

                    {/* Table Card */}
                    <div className="bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/40 shadow-lg">
                        {slides.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-600 text-lg font-medium">
                                    No carousel slides available. Add one to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-[#604a03ff]/80 to-[#af8314ff]/80 text-white">
                                            <th className="p-4 text-left text-sm font-semibold">Image</th>
                                            <th className="p-4 text-left text-sm font-semibold">Title</th>
                                            <th className="p-4 text-left text-sm font-semibold">Subtitle</th>
                                            <th className="p-4 text-center text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {slides.map((slide) => (
                                            <tr 
                                                key={slide.id} 
                                                className="border-b border-white/30 hover:bg-white/20 transition duration-200"
                                            >
                                                <td className="p-4">
                                                    <img
                                                        src={slide.imageUrl}
                                                        alt="carousel"
                                                        className="w-32 h-20 object-cover rounded-lg border border-white/40 shadow-md"
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <p className="font-semibold text-gray-800">{slide.title}</p>
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-gray-700">{slide.subtitle}</p>
                                                </td>
                                                <td className="p-4 flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => handleUpdateCarousel(slide.id)}
                                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition font-semibold text-sm shadow-md"
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(slide.id)}
                                                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition font-semibold text-sm shadow-md"
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

                    {/* Modals */}
                    {showAddModal && (
                        <AddSlideModal
                            onClose={() => setShowAddModal(false)}
                            reload={loadSlides}
                        />
                    )}

                    {showEditModal && (
                        <EditSlideModal
                            slide={selectedSlide}
                            onClose={() => setShowEditModal(false)}
                            reload={loadSlides}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminCarousel;
