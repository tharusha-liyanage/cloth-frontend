import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#023545] mb-6">Manage Carousel Slides</h1>

            <button
                onClick={handleAddCarousel}
                className="mb-4 bg-[#023545] text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                Add New Slide
            </button>

            {/* Table */}
            <div className="overflow-auto shadow-lg rounded-xl">
                <table className="min-w-full text-left border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Subtitle</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {slides.map((slide) => (
                            <tr key={slide.id} className="border-b hover:bg-gray-100">
                                <td className="p-3">
                                    <img
                                        src={slide.imageUrl}
                                        alt="carousel"
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="p-3">{slide.title}</td>
                                <td className="p-3">{slide.subtitle}</td>
                                <td className="p-3 flex gap-3">
                                    <button
                                         onClick={() => handleUpdateCarousel(slide.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => handleDelete(slide.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    );
};

export default AdminCarousel;
