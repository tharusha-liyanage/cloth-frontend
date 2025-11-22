// src/components/Auth/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen = true, onClose }) {
    const { login, refreshUser } = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // If used as a modal, hide when isOpen is false
    if (!isOpen && onClose) return null;

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

    // Determine wrapper: modal overlay if onClose exists
    const Wrapper = onClose ? "div" : React.Fragment;
    const wrapperProps = onClose
        ? { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" }
        : {};

    return (
        <Wrapper {...wrapperProps}>
            <div className={`bg-white rounded-2xl shadow-2xl w-96 p-6 relative ${!onClose ? "mx-auto mt-24" : ""}`}>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    >
                        &times;
                    </button>
                )}

                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </form>
            </div>
        </Wrapper>
    );
}
