// src/components/Auth/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Header&Footer/Navbar.jsx";
import Footer from "../Header&Footer/Footer.jsx";

export default function LoginModal({ isOpen = true, onClose }) {
    const { login, refreshUser } = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const isStandalone = onClose === undefined; // when used as a routed page

    // If used as a modal, hide when isOpen is false
    if (!isStandalone && !isOpen) return null;

    const handleChange = (e) =>
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const success = await login(credentials.username, credentials.password);
        setLoading(false);

        if (success) {
            await refreshUser();
            // Close modal if exists
            if (onClose) onClose();
            // Redirect to home page
            navigate("/");
        } else {
            alert("Invalid username or password!");
        }
    };

    const content = (
        <div className={`bg-white rounded-2xl shadow-2xl w-96 p-6 relative ${isStandalone ? "mx-auto" : ""}`}>
            {!isStandalone && onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>
            )}

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "LOGIN"}
                </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
                Don't have an account? <button onClick={() => navigate("/signup")} className="text-[#604a03ff] font-semibold">Sign up</button>
            </p>
        </div>
    );

    if (isStandalone) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f6f2ea]/40 via-[#EAF4F6]/40 to-[#f6f2ea]/40">
                <Navbar />

                <main className="flex-1 flex items-center justify-center px-6 py-12 mt-15">
                    <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-lg">
                        {content}
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // Render as modal overlay when used as a modal
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {content}
        </div>
    );
}
