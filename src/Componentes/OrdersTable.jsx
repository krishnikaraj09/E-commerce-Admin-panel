import { useState } from "react";
import orders from "../Data/ordersdata.json";

const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-200 text-green-700";
        case "Pending":
            return "bg-yellow-200 text-yellow-700";
        case "Cancelled":
            return "bg-red-200 text-red-700"
        case "Processing":
            return "bg-blue-200 text-blue-700"
        default:
            return "bg-gray-100 text-gray-700"
    }
};

const OrdersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentOrders = orders.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(orders.length / recordsPerPage);

    const handleNext = () => {
        if (currentPage < totalPage) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full overflow-x-auto dark:bg-white/70">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Recent Orders
            </h2>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse cursor-pointer">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-sm uppercase dark:bg-gray-500">
                            <th className="py-3 px-4 text-left">Order Id</th>
                            <th className="py-3 px-4 text-left">Customer</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id}
                                className="border-b hover:bg-gray-100 dark:hover:bg-gray-400 transition duration-200">
                                <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                                <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                                <td className="py-3 px-4 text-gray-600">{order.amount}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${getStatusColor(
                                        order.status
                                    )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {currentOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 hover:bg-gray-100 dark:bg-white/70">
                        <div>
                            <p><strong>Order ID : </strong>{order.id}</p>
                            <p><strong>Customer : </strong>{order.customer}</p>
                            <p><strong>Date : </strong>{order.date}</p>
                            <p><strong>Amount : </strong>{order.amount}</p>
                            <div className="flex">
                                <p><strong>Status :</strong></p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${getStatusColor(
                                    order.status
                                )}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-orange-500 dark:hover:bg-orange-70"
                        }`}>
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPage}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPage}
                    className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPage
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-orange-500 dark:hover:bg-orange-700"
                        }`}
                >
                    Next
                </button>

            </div>
        </div>
    )
}

export default OrdersTable;