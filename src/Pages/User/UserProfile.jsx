import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const API_CANDIDATES = [
    "http://localhost:8080/api/orders/my",
    "http://localhost:8080/api/orders/user",
    "http://localhost:8080/api/orders/byUser",
    // fallback for development (admin endpoint, will be filtered by username)
    "http://localhost:8080/api/orders/all",
];

const UserProfile = () => {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        if (!token) return;
        loadOrders();
    }, [token]);

    const loadOrders = async () => {
        setLoading(true);
        setError(null);

        for (const url of API_CANDIDATES) {
            try {
                const res = await axios.get(url);
                let data = res.data || [];

                // Normalize and keep only orders that belong to the current user
                const isOrderForUser = (o, u) => {
                    if (!u) return false;

                    const uname = (u.username || u.name || "").toString().toLowerCase();
                    const uid = (u.id || u.userId || u._id || "").toString();

                    // Gather candidate fields from order
                    const fields = [
                        o.username,
                        o.user,
                        o.customer,
                        o.customerEmail,
                        o.userId,
                        o.id,
                        o.customerId,
                    ].filter(Boolean);

                    // Nested user object support
                    if (o.user && typeof o.user === "object") {
                        fields.push(o.user.username, o.user.email, o.user.id);
                    }

                    // Check by id first
                    if (uid && fields.some((f) => f && f.toString() === uid)) return true;

                    // Check by username / email (case-insensitive)
                    if (uname && fields.some((f) => f && f.toString().toLowerCase() === uname)) return true;

                    return false;
                };

                const owned = (data || []).filter((o) => isOrderForUser(o, user));

                // Keep only completed orders (flexible match)
                const completed = (owned || []).filter((o) => {
                    const s = (o.status || "").toString().toLowerCase();
                    return s.includes("complete") || s.includes("deliv") || s.includes("paid") || s.includes("success");
                });

                setOrders(completed);
                setLoading(false);
                return; // success — stop trying other endpoints
            } catch (err) {
                // try next candidate
                console.warn(`orders fetch failed for ${url}:`, err?.message || err);
                continue;
            }
        }

        setError("Unable to load orders. Please try again later.");
        setLoading(false);
    };

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (!token)
        return (
            <div className="min-h-screen bg-[#fffff6ff]">
                <Navbar />
                <main className="max-w-4xl mx-auto p-6 mt-28">
                    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 text-center border border-white/30">
                        <h2 className="text-2xl font-bold text-[#604a03ff]">Please log in</h2>
                        <p className="mt-2 text-gray-600">You need to be logged in to view your profile and orders.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );

    return (
        <div className="min-h-screen bg-[#fffff6ff]">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6 mt-20">
                {/* Greeting */}
                <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-6 border border-white/30 shadow-lg">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#604a03ff]">Hello, {user?.username || user?.name || "Valued Customer"} 👋</h1>
                </div>

                {/* Orders */}
                <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#604a03ff]">Completed Orders</h2>
                        <button
                            onClick={loadOrders}
                            className="text-sm text-[#604a03ff] hover:text-[#af8314ff]"
                        >
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">Loading orders…</div>
                    ) : error ? (
                        <div className="text-center text-red-600 py-10">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-10 text-gray-600">No completed orders found.</div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white p-4 rounded-lg border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gray-800">Order #{order.id}</div>
                                            <div className="text-sm text-gray-600">{new Date(order.createdAt || order.date || order.orderDate || Date.now()).toLocaleString()}</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-green-700">Rs. {order.totalAmount?.toLocaleString?.() || order.total?.toLocaleString?.() || "-"}</div>
                                            <div className="text-xs text-gray-500">Status: {order.status}</div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <button
                                            onClick={() => toggleExpand(order.id)}
                                            className="text-sm text-[#604a03ff] hover:text-[#af8314ff]"
                                        >
                                            {expandedOrder === order.id ? "Hide items" : "View items"}
                                        </button>
                                    </div>

                                    {expandedOrder === order.id && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(order.items || []).map((it, idx) => (
                                                <div key={idx} className="flex gap-4 items-center bg-white/50 p-3 rounded-lg border border-white/10">
                                                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                                        <img src={it.imageUrl || it.image || it.productImage} alt={it.clothName || it.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-gray-800 truncate">{it.clothName || it.name || it.productName}</div>
                                                        <div className="text-sm text-gray-600">Size: {it.size}</div>
                                                        <div className="text-sm text-gray-600">Qty: {it.quantity || it.qty || 1}</div>
                                                        <div className="text-sm font-bold text-green-700 mt-1">Rs. {it.subTotal?.toLocaleString?.() || it.price?.toLocaleString?.() || "-"}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserProfile;
