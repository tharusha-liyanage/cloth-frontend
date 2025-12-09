import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/orders/all";

const AdminOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await axios.get(API_URL);
            setOrders(res.data);
        } catch (err) {
            console.error("Error loading orders:", err);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-[#023545] mb-8">
                All Orders
            </h1>

            <div className="overflow-auto shadow-xl rounded-lg">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Total Amount</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                {/* ORDER ROW */}
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">{order.id}</td>
                                    <td className="p-3">{order.username}</td>
                                    <td className="p-3">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-3">{order.status}</td>
                                    <td className="p-3 font-bold text-green-600">
                                        Rs. {order.totalAmount.toLocaleString()}
                                    </td>

                                    <td className="p-3">
                                        <button
                                            onClick={() => toggleExpand(order.id)}
                                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                                        >
                                            {expandedOrder === order.id
                                                ? "Hide Items"
                                                : "View Items"}
                                        </button>
                                    </td>
                                </tr>

                                {/* EXPANDED ORDER ITEMS */}
                                {expandedOrder === order.id && (
                                    <tr>
                                        <td colSpan="6" className="bg-gray-50 p-5">
                                            <h3 className="text-xl font-semibold mb-3 text-[#023545]">
                                                Items in Order #{order.id}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {order.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 p-3 bg-white rounded-lg shadow border"
                                                    >
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.clothName}
                                                            className="w-24 h-24 object-cover rounded"
                                                        />

                                                        <div>
                                                            <h4 className="font-bold text-lg">
                                                                {item.clothName}
                                                            </h4>
                                                            <p className="text-gray-600">
                                                                Size: <b>{item.size}</b>
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Quantity: <b>{item.quantity}</b>
                                                            </p>
                                                            <p className="text-green-700 font-semibold">
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
    );
};

export default AdminOrderDetails;
