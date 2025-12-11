import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/offers";

export default function AdminOfferSection() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const [formData, setFormData] = useState({
        title1: "",
        title2: "",
        image: null,
    });

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [imageName, setImageName] = useState("");
    const [removeImage, setRemoveImage] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        loadOffers();
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && modalOpen) setModalOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [modalOpen]);

    useEffect(() => {
        if (modalOpen) {
            // focus the title input when modal opens
            setTimeout(() => titleRef.current?.focus(), 60);
        }
    }, [modalOpen]);

    const loadOffers = async () => {
        try {
            const res = await axios.get(`${API_URL}/all`);
            setOffers(res.data || []);
        } catch (err) {
            console.error("Failed to load offers:", err);
        }
    };

    const openAddModal = () => {
        setEditingOffer(null);
        setFormData({ title1: "", title2: "", image: null });
        setPreview("");
        setImageName("");
        setRemoveImage(false);
        setModalOpen(true);
    };

    const openEditModal = (offer) => {
        setEditingOffer(offer);
        setFormData({ title1: offer.title1, title2: offer.title2, image: null });
        setPreview(offer.imageUrl || "");
        setImageName("");
        setRemoveImage(false);
        setModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
        setImageName(file.name);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
        setImageName(file.name);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title1.trim()) {
            alert("Please provide a title.");
            return;
        }

        const form = new FormData();
        form.append("title1", formData.title1);
        form.append("title2", formData.title2);
        if (formData.image) form.append("image", formData.image);
        if (removeImage) form.append("removeImage", "true");

        try {
            setLoading(true);
            if (editingOffer) {
                await axios.put(`${API_URL}/update/${editingOffer.id}`, form);
                alert("Offer updated!");
            } else {
                await axios.post(`${API_URL}/add`, form);
                alert("Offer added!");
            }
            setModalOpen(false);
            loadOffers();
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Failed to save offer. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const deleteOffer = async (id) => {
        if (!window.confirm("Delete this offer?")) return;
        try {
            await axios.delete(`${API_URL}/delete/${id}`);
            loadOffers();
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete offer.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f6f2ea]/40 via-[#EAF4F6]/40 to-[#f6f2ea]/40">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 mt-20">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/adminPage")}
                            className="flex items-center gap-2 text-[#604a03ff] hover:text-[#af8314ff] font-semibold"
                            aria-label="Back to admin"
                        >
                            <ArrowLeft size={18} />
                            Back to Admin
                        </button>

                        <h2 className="text-2xl md:text-3xl font-bold text-[#604a03ff] mt-20 ml-80">
                            Manage Offers
                        </h2>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-4 py-2 rounded-xl shadow-md hover:scale-[1.01] transition"
                        aria-label="Add offer"
                    >
                        <Plus size={16} />
                        Add Offer
                    </button>
                </div>

                    {offers.length === 0 ? (
                    <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl p-12 text-center text-gray-600">
                        <p className="text-lg font-semibold text-[#604a03ff]">No offers yet</p>
                        <p className="mt-2">Create a new promotional offer to show on the homepage.</p>
                        <div className="mt-6">
                            <button onClick={openAddModal} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-4 py-2 rounded-lg">Create offer</button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1  gap-6">
                        {offers.map((offer) => (
                            <div key={offer.id} className="relative rounded-2xl overflow-hidden transform transition hover:scale-105 hover:shadow-2xl bg-white/5 border border-white/10">
                                <div className="relative h-72 bg-gray-100">
                                    <img src={offer.imageUrl} alt={offer.title1} className="w-full h-full object-cover" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

                                    <div className="absolute left-4 bottom-4 text-white">
                                        <p className="text-lg font-bold drop-shadow">{offer.title1}</p>
                                        <p className="text-sm drop-shadow">{offer.title2}</p>
                                    </div>

                                    {/* persistent small controls top-right for clarity */}
                                    <div className="absolute right-4 top-4 flex items-center gap-2">
                                        <button onClick={() => openEditModal(offer)} aria-label={`Edit ${offer.title1}`} className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 text-[#604a03ff] shadow hover:scale-105">
                                            <Edit2 size={16} />
                                        </button>

                                        <button onClick={() => deleteOffer(offer.id)} aria-label={`Delete ${offer.title1}`} className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-600 text-white shadow hover:scale-105">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#bcb4b4ff] bg-opacity-40 p-4" role="dialog" aria-modal="true">
                    <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="text-lg font-semibold text-[#604a03ff]">{editingOffer ? "Edit Offer" : "Add Offer"}</h3>
                            <button onClick={() => setModalOpen(false)} aria-label="Close dialog" className="text-gray-700 hover:text-gray-900">✕</button>
                        </div>

                                <div className="p-6">
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            {editingOffer && editingOffer.imageUrl && (
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Current image</label>
                                                    <div className="w-full h-40 rounded-lg overflow-hidden border border-white/20 mt-2">
                                                        <img src={editingOffer.imageUrl} alt="current" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <button type="button" onClick={() => { setPreview(editingOffer.imageUrl); setFormData({ ...formData, image: null }); setImageName(''); setRemoveImage(false);} } className="px-3 py-1 bg-white/70 rounded-md">Keep</button>
                                                        <button type="button" onClick={() => { setPreview(''); setFormData({ ...formData, image: null }); setImageName(''); setRemoveImage(true);} } className="px-3 py-1 bg-red-600 text-white rounded-md">Remove</button>
                                                        <div className="text-xs text-gray-500">Removing will send a remove flag.</div>
                                                    </div>
                                                </div>
                                            )}

                                            <label className="block text-sm font-medium text-gray-700">Title 1</label>
                                            <input ref={titleRef} type="text" required value={formData.title1} onChange={(e) => setFormData({ ...formData, title1: e.target.value })} className="mt-1 block w-full rounded-lg p-3 bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#604a03ff]" />

                                            <label className="block text-sm font-medium text-gray-700 mt-4">Title 2</label>
                                            <input type="text" required value={formData.title2} onChange={(e) => setFormData({ ...formData, title2: e.target.value })} className="mt-1 block w-full rounded-lg p-3 bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#604a03ff]" />

                                            <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${dragOver ? 'border-[#604a03ff] bg-white/60' : 'border-white/50 bg-white/5'}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                                                <label className="block text-sm font-medium text-gray-700">Image (drag & drop or click)</label>
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full" />
                                                <div className="text-xs text-gray-500 mt-2">{imageName || (editingOffer ? 'Current image will be kept if you do not upload new' : 'No file selected')}</div>
                                            </div>

                                            <div className="flex justify-end gap-3 mt-6">
                                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white/60 rounded-lg">Cancel</button>
                                                <button type="submit" disabled={loading} className="px-4 py-2 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white rounded-lg disabled:opacity-60">{loading ? 'Saving...' : (editingOffer ? 'Update' : 'Add')}</button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-white/30 mb-4 flex items-center justify-center">
                                                {preview ? (
                                                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-gray-400">No preview</div>
                                                )}
                                            </div>

                                            <div className="w-full bg-white/50 p-4 rounded-lg border border-white/30 text-center">
                                                <h4 className="font-semibold text-[#604a03ff] truncate">{formData.title1 || 'Offer Title'}</h4>
                                                <p className="text-sm text-gray-700 mt-1 truncate">{formData.title2 || 'Offer subtitle'}</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
