import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import customerDetails from "../../../Data/customerdetails.json";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
    const [customerList, setCustomerList] = useState([]);
    const navigate = useNavigate();

    // Load customers from Local storage or initialize from JSOn
    useEffect(() => {
        let stored = [];
        try {
            const storedCustomers = localStorage.getItem("customers");
            stored = storedCustomers ? JSON.parse(storedCustomers) : [];
        } catch (error) {
            console.error("Error parsing customers from localStorage:", error);
            stored = [];
        }
        if (stored && stored.length > 0) {
            setCustomerList(stored);
        } else {
            localStorage.setItem("customers", JSON.stringify(customerDetails));
            setCustomerList(customerDetails);
        }
    }, []);

    // Update customer in state & Local Storage
    const updateCustomers = (updatedCustomers) => {
        setCustomerList(updatedCustomers);
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    };

    // Delete Customer
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?"))
            return;
        const updatedCustomers = customerList.filter((c) => c.id !== id);
        updateCustomers(updatedCustomers);
        alert("Customer Deleted Successfully!");
    };

    return (
        <div className="bg-white p-2 dark:bg-slate-900">
            <h1 className="text-2xl font-bold p-6 text-blue-900 dark:text-white">Customer List</h1>
            {/* DeskTop Table View*/}
            <div className=" hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse cursor-pointer">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-sm uppercase dark:bg-gray-300">
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th colSpan={2} className="py-3 px-4 text-center">Address</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map((customer) => (
                            <tr key={customer.customerId} className="border-b text-gray-600 hover:bg-gray-100 transition duration-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
                                <td className="py-3 px-4">{customer.id}</td>
                                <td className="py-3 px-4">{customer.name}</td>
                                <td className="py-3 px-4">{customer.email}</td>
                                <td className="py-3 px-4">{customer.phone}</td>
                                <td className="py-3 px-4 text-sm">
                                    <p><strong>Billing:</strong> {customer.address.billing.street}, {customer.address.billing.city}, {customer.address.billing.state} {customer.address.billing.zip}</p>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <p><strong>Shipping:</strong> {customer.address.shipping.street}, {customer.address.shipping.city}, {customer.address.shipping.state} {customer.address.shipping.zip}</p>
                                </td>
                                <td className="py-3 px-4">{customer.status}</td>
                                <td className="py-3 px-4 my-4 flex gap-3">
                                    <button
                                        onClick={() => navigate(`/customerList/${customer.id}`)}
                                        className="text-gray-600 dark:text-black"
                                    >
                                        <VisibilityIcon />
                                    </button>
                                    <button 
                                    onClick={()=>handleDelete(customer.id)}
                                    className="text-red-600"><DeleteIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
                {customerList.map((customer) => (
                    <div key={customer.customerId} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 dark:bg-white/70">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <p className="text-sm"><strong>ID : </strong>{customer.id}</p>
                                <p className="text-sm"><strong>Name : </strong>{customer.name}</p>
                                <p className="text-sm"><strong>Email : </strong>{customer.email}</p>
                                <p className="text-sm"><strong>Phone : </strong>{customer.phone}</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">Address</h3>
                                <p className="text-sm"><strong>Billing:</strong></p>
                                <p className="text-sm">{customer.address.billing.street}, {customer.address.billing.city}, {customer.address.billing.state} {customer.address.billing.zip}</p>
                                <p className="text-sm"><strong>Shipping:</strong></p>
                                <p className="text-sm"> {customer.address.shipping.street}, {customer.address.shipping.city}, {customer.address.shipping.state} {customer.address.shipping.zip}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm"><strong>Status : </strong>{customer.status}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/customerList/${customer.id}`)}
                                    className="text-gray-600 hover:text-blue-600 transition"
                                >
                                    <VisibilityIcon />
                                </button>
                                <button
                                    onClick={() => handleDelete(customer.id)}
                                    className="text-red-600 hover:text-red-900 transition"
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerList;