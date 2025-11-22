import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/homecarousel/add";

const AddSlideModal = ({ onClose, reload }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("image", image);

        await axios.post(API_URL, formData);

        reload();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[#023545]">Add Carousel Slide</h2>

                <form onSubmit={handleSubmit}>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2 mb-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="block font-medium mb-1">Subtitle</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2 mb-3"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        required
                    />

                    <label className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border rounded p-2 mb-4"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />

                    <button className="w-full bg-[#023545] text-white py-2 rounded-lg hover:bg-indigo-700">
                        Add Slide
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-3 w-full border py-2 rounded-lg hover:bg-gray-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddSlideModal;
