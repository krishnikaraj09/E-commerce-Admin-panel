import { useEffect, useState } from "react";
import ordersData from "../../../Data/orders.json";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Load orders from Local Storage or initialize from JSON
    useEffect(() => {
        let storedOrders = [];
        try {
            const stored = localStorage.getItem("orders");
            storedOrders = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error parsing orders from localStorage:", error);
            storedOrders = [];
        }
        if (storedOrders && storedOrders.length > 0) {
            setOrders(storedOrders);
        } else {
            localStorage.setItem("orders", JSON.stringify(ordersData));
            setOrders(ordersData);
        }
    }, []);

    // Update orders in state & Local Storage
    const updateOrders = (updatedOrders) => {
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    // Delete Order
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        const updatedOrders = orders.filter((o) => o.id !== id);
        updateOrders(updatedOrders);
        alert("Order Deleted Successfully!");
    };

    // Update Status
    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map((o) => {
            if (o.id === id) {
                return { ...o, orderStatus: newStatus, updatedAt: new Date().toISOString() };
            }
            return o;
        });
        updateOrders(updatedOrders);
        alert(`Order status updated to "${newStatus}"`);
    };

    return (
        <div className="bg-white p-2 dark:bg-slate-900 min-h-screen">
            <div className="flex items-center justify-between m-1">
                <h1 className="text-2xl font-bold p-6 text-blue-900 dark:text-white">Order List</h1>
                <button
                    onClick={() => navigate("/addOrder")}
                    className="mt-2 p-2 text-sm bg-blue-800 text-white font-semibold w-40 rounded-md hover:bg-blue-900 dark:bg-orange-500 dark:hover:bg-orange-700"
                >
                    + Add
                </button>
            </div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse cursor-pointer">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-sm uppercase dark:bg-gray-300">
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Customer</th>
                            <th className="py-3 px-4 text-left">Total (₹)</th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Created</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b text-gray-600 hover:bg-gray-100 transition duration-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.customerName}</td>
                                <td className="py-3 px-4">₹{order.grandTotal}</td>
                                <td className="py-3 px-4">{order.paymentStatus}</td>

                                {/* Status Dropdown */}
                                <td className="py-3 px-4 dark:text-black">
                                    <select
                                        className="border rounded px-2 py-1"
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                        <option value="Returned / Refunded">Returned / Refunded</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4">
                                    {new Date(order.createdAt).toLocaleString("en-IN")}
                                </td>
                                <td className="py-3 px-4 space-x-3">
                                    <button
                                        onClick={() => navigate(`/orderList/${order.id}`)}
                                        className="text-gray-600 hover:text-gray-800 dark:text-black"
                                    >
                                        <VisibilityIcon />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 dark:bg-white/70">
                        <div>
                            <p><strong>ID : </strong>{order.id}</p>
                            <p><strong>Customer : </strong>{order.customerName}</p>
                            <p><strong>Total (₹) : </strong>{order.grandTotal}</p>
                            <p><strong>Payment : </strong>{order.paymentStatus}</p>
                            <p><strong>Status : </strong>
                                <select
                                    className="border rounded px-2 py-1 max-w-[100px] text-sm"
                                    value={order.orderStatus}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                    <option value="Returned / Refunded">Returned / Refunded</option>
                                </select>
                            </p>
                            <p><strong>Created : </strong>{new Date(order.createdAt).toLocaleString("en-IN")}</p>
                            <div className="flex items-center gap-5">
                                <p><strong>Action : </strong></p>
                                <button
                                    onClick={() => navigate(`/orderList/${order.id}`)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <VisibilityIcon />
                                </button>

                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <DeleteIcon />
                                </button></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
