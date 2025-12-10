import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Header&Footer/Navbar.jsx";
import Footer from "../Header&Footer/Footer.jsx";

export default function SignupModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const isStandalone = isOpen === undefined; // Check if being used as a page route
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/register", {
                username: user.username,
                password: user.password,
                email:user.email,
            });
            alert(res.data.message || "User registered successfully!");
            if (onClose) onClose();
            if (isStandalone) navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Registration failed!");
        }
    };

    // Hide if used as modal and isOpen is false
    if (!isStandalone && !isOpen) return null;

    // If standalone, wrap with Navbar/Footer and center the form on a glass card
    if (isStandalone) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f6f2ea]/40 via-[#EAF4F6]/40 to-[#f6f2ea]/40">
                <Navbar />

                <main className="flex-1 flex items-center justify-center px-6 py-12 mt-15">
                    <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#dbbf7fff] rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold text-center text-[#604a03ff] mb-6">Sign Up</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#604a03ff]"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white font-semibold rounded-lg hover:opacity-90 transition"
                            >
                                SIGN UP
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-700 mt-4">
                            Already have an account? <button onClick={() => navigate("/login")} className="text-[#604a03ff] font-semibold">Login</button>
                        </p>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // Default: render as modal
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">
                <button
                    onClick={() => {
                        if (onClose) onClose();
                        if (isStandalone) navigate("/");
                    }}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                    >
                        SIGN UP
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
