import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/offers";

export default function AdminOfferSection() {
    const [offers, setOffers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const [formData, setFormData] = useState({
        title1: "",
        title2: "",
        image: null,
    });

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        const res = await axios.get(`${API_URL}/all`);
        setOffers(res.data);
    };

    const openAddModal = () => {
        setEditingOffer(null);
        setFormData({ title1: "", title2: "", image: null });
        setModalOpen(true);
    };

    const openEditModal = (offer) => {
        setEditingOffer(offer);
        setFormData({
            title1: offer.title1,
            title2: offer.title2,
            image: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title1", formData.title1);
        form.append("title2", formData.title2);
        if (formData.image) form.append("image", formData.image);

        if (editingOffer) {
            await axios.put(`${API_URL}/update/${editingOffer.id}`, form);
            alert("Offer updated!");
        } else {
            await axios.post(`${API_URL}/add`, form);
            alert("Offer added!");
        }

        setModalOpen(false);
        loadOffers();
    };

    const deleteOffer = async (id) => {
        if (!window.confirm("Delete this offer?")) return;
        await axios.delete(`${API_URL}/delete/${id}`);
        loadOffers();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#023545]">Manage Offers</h2>
                <button
                    onClick={openAddModal}
                    className="bg-[#023545] text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                    + Add Offer
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="bg-white rounded-xl shadow-lg p-4 relative"
                    >
                        <img
                            src={offer.imageUrl}
                            alt="Offer"
                            className="w-full h-44 object-cover rounded-lg"
                        />

                        <div className="mt-3">
                            <p className="font-bold text-lg">{offer.title1}</p>
                            <p className="text-xl text-gray-600">{offer.title2}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => openEditModal(offer)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteOffer(offer.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white w-[400px] p-6 rounded-xl shadow-xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingOffer ? "Edit Offer" : "Add Offer"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Title 1"
                                value={formData.title1}
                                onChange={(e) =>
                                    setFormData({ ...formData, title1: e.target.value })
                                }
                                required
                                className="w-full p-2 border rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Title 2"
                                value={formData.title2}
                                onChange={(e) =>
                                    setFormData({ ...formData, title2: e.target.value })
                                }
                                required
                                className="w-full p-2 border rounded-lg"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.files[0] })
                                }
                                className="w-full"
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#023545] text-white rounded-lg"
                                >
                                    {editingOffer ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
