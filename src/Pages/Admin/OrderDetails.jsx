import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/orders/all";

const AdminOrderDetails = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await axios.get(API_URL);
            setOrders(res.data || []);
        } catch (err) {
            console.error("Error loading orders:", err);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f6f2ea]/40 via-[#EAF4F6]/40 to-[#f6f2ea]/40">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 ">
                <div className="flex items-center gap-4 mb-8 ">
                    <button
                        onClick={() => navigate("/adminPage")}
                        className="flex items-center gap-2 text-[#604a03ff] hover:text-[#af8314ff] font-semibold"
                        aria-label="Back to admin"
                    >
                        <ArrowLeft size={18} />
                        Back to Admin
                    </button>

                    <h1 className="text-2xl md:text-3xl font-bold text-[#604a03ff] mt-20 ml-80">
                        All Orders
                    </h1>
                </div>
                {orders.length === 0 ? (
                    <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl p-12 text-center">
                        <p className="text-lg font-semibold text-[#604a03ff]">No orders yet</p>
                        <p className="text-gray-600 mt-2">Orders will appear here as customers place them.</p>
                    </div>
                ) : (
                    <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-[#604a03ff]/10 to-[#af8314ff]/10 border-b border-white/20">
                                    <tr>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">Order ID</th>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">User</th>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">Date</th>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">Status</th>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">Total</th>
                                        <th className="p-4 text-left text-sm font-semibold text-[#604a03ff]">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <React.Fragment key={order.id}>
                                            <tr className="border-b border-white/10 hover:bg-white/20 transition">
                                                <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                                                <td className="p-4 text-gray-700">{order.username}</td>
                                                <td className="p-4 text-gray-700 text-sm">
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-green-700">
                                                    Rs. {order.totalAmount.toLocaleString()}
                                                </td>

                                                <td className="p-4">
                                                    <button
                                                        onClick={() => toggleExpand(order.id)}
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                                                        aria-label={`${expandedOrder === order.id ? 'Hide' : 'View'} items for order ${order.id}`}
                                                    >
                                                        {expandedOrder === order.id ? (
                                                            <>
                                                                <ChevronUp size={16} />
                                                                Hide Items
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown size={16} />
                                                                View Items
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>

                                            {expandedOrder === order.id && (
                                                <tr>
                                                    <td colSpan="6" className="bg-white/5 p-6">
                                                        <h3 className="text-lg font-semibold text-[#604a03ff] mb-4">
                                                            Items in Order #{order.id}
                                                        </h3>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {order.items.map((item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex gap-4 p-4 bg-white/50 rounded-xl border border-white/20 hover:border-white/40 transition"
                                                                >
                                                                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                                                                        <img
                                                                            src={item.imageUrl}
                                                                            alt={item.clothName}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>

                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-bold text-gray-800 truncate">
                                                                            {item.clothName}
                                                                        </h4>
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            <span className="font-semibold">Size:</span> {item.size}
                                                                        </p>
                                                                        <p className="text-sm text-gray-600">
                                                                            <span className="font-semibold">Qty:</span> {item.quantity}
                                                                        </p>
                                                                        <p className="text-sm font-bold text-green-700 mt-2">
                                                                            Rs. {item.subTotal.toLocaleString()}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default AdminOrderDetails;
