import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        let customers = [];
        try {
            const storedCustomers = localStorage.getItem("customers");
            customers = storedCustomers ? JSON.parse(storedCustomers) : [];
        } catch (error) {
            console.error("Error parsing customers from localStorage:", error);
            customers = [];
        }
        const foundCustomer = customers.find((c) => c.id === Number(id));
        setCustomer(foundCustomer);
    }, [id]);

    if (!customer) {
        return (
            <div className='p-4 text-center'>
                <h2 className='text-xl font-bold'>Order Not Found</h2>
                <button
                    onClick={() => navigate(`/customerList/${id}`)}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Back to Orders
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center md:text-left dark:text-white">Customer Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                    <div className="space-y-2">
                        <p className="text-gray-600"><strong className="text-gray-800">ID : </strong> {customer.id}</p>
                        <p className="text-gray-600"><strong className="text-gray-800">Name : </strong> {customer.name}</p>
                        <p className="text-gray-600"><strong className="text-gray-800">Email : </strong> {customer.email}</p>
                        <p className="text-gray-600"><strong className="text-gray-800">Phone : </strong> {customer.phone}</p>
                        <p className="text-gray-600"><strong className="text-gray-800">Status : </strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{customer.status}</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Address</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-800 mb-2">Billing Address :</h3>
                            <p className="text-gray-600">{customer.address.billing.street}</p>
                            <p className="text-gray-600">{customer.address.billing.city}, {customer.address.billing.state}, {customer.address.billing.zip}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 mb-2">Shipping Address :</h3>
                            <p className="text-gray-600">{customer.address.shipping.street}</p>
                            <p className="text-gray-600">{customer.address.shipping.city}, {customer.address.shipping.state}, {customer.address.shipping.zip}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order History</h2>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.orderHistory && customer.orderHistory.length > 0 ? (
                                customer.orderHistory.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{order.orderId}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{order.date}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">₹{order.total}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                                            {order.items && order.items.length > 0 ? (
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700">Product ID</th>
                                                                <th className="border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700">Name</th>
                                                                <th className="border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700">Quantity</th>
                                                                <th className="border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.items.map((item) => (
                                                                <tr key={item.productId} className="hover:bg-gray-50">
                                                                    <td className="border border-gray-200 px-2 py-1 text-xs text-gray-600">{item.productId}</td>
                                                                    <td className="border border-gray-200 px-2 py-1 text-xs text-gray-600">{item.name}</td>
                                                                    <td className="border border-gray-200 px-2 py-1 text-xs text-gray-600">{item.quantity}</td>
                                                                    <td className="border border-gray-200 px-2 py-1 text-xs text-gray-600">₹{item.price}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500">No items found</p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500">
                                        No Order History Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-4">
                    {customer.orderHistory && customer.orderHistory.length > 0 ? (
                        customer.orderHistory.map((order) => (
                            <div key={order.orderId} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-medium text-gray-800">Order #{order.orderId}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1"><strong>Date:</strong> {order.date}</p>
                                <p className="text-sm text-gray-600 mb-3"><strong>Total:</strong> ₹{order.total}</p>
                                <div className="border-t pt-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                                    {order.items && order.items.length > 0 ? (
                                        <div className="space-y-2">
                                            {order.items.map((item) => (
                                                <div key={item.productId} className="bg-white p-2 rounded border">
                                                    <p className="text-xs text-gray-600"><strong>ID:</strong> {item.productId}</p>
                                                    <p className="text-xs text-gray-600"><strong>Name:</strong> {item.name}</p>
                                                    <p className="text-xs text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                                                    <p className="text-xs text-gray-600"><strong>Price:</strong> ₹{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No items found</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-500 py-4">No Order History Found</p>
                    )}
                </div>
            </div>
            <div className="text-center">
                <button
                    onClick={() => navigate("/customerList")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200 dark:bg-orange-500 dark:hover:bg-orange-700  "
                >
                    Back to Customers
                </button>
            </div>
        </div>
    )
};

export default CustomerDetails;