import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrders] = useState(null);

    useEffect(() => {
        let orders = [];
        try {
            const storedOrders = localStorage.getItem("orders");
            orders = storedOrders ? JSON.parse(storedOrders) : [];
        } catch (error) {
            console.error("Error parsing orders from localStorage:", error);
            orders = [];
        }
        const foundOrder = orders.find((o) => o.id === Number(id));
        setOrders(foundOrder);
    }, [id]);

    if (!order) {
        return (
            <div className='p-4 text-center'>
                <h2 className='text-xl font-bold'>Order Not Found</h2>
                <button
                    onClick={() => navigate(`/orderList/${id}`)}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Back to Orders
                </button>
            </div>
        );
    };

    return (
        <div className="dark:bg-slate-900">
            <div className='p-2 sm:p-4 w-full sm:w-5/6 lg:w-4/5 xl:w-3/4 mx-auto'>
                <h2 className='text-xl sm:text-2xl font-bold text-blue-900 text-center mb-4 dark:text-white'>Product Details - # {order.id}</h2>
                <div className='mb-4 p-4 border rounded bg-gray-50'>
                    <h2 className='text-lg font-semibold mb-2'>Customer Information</h2>
                    <p className='text-sm sm:text-base'><strong>Name : </strong>{order.customerName}</p>
                    <p className='text-sm sm:text-base'><strong>Email : </strong>{order.customerEmail}</p>
                    <p className='text-sm sm:text-base'><strong>Phone : </strong>{order.customerPhone}</p>
                </div>
                <div className='mb-4 p-4 border rounded bg-gray-50'>
                    <h2 className='text-lg font-semibold mb-2'>Address</h2>
                    <p className='text-sm sm:text-base'><strong>Shipping : </strong>{order.shippingAddress}</p>
                    <p className='text-sm sm:text-base'><strong>Billing : </strong>{order.billingAddress}</p>
                </div>
                <div className='mb-4 p-4 sm:p-4 border rounded bg-gray-50'>
                    <h2 className='text-base sm:text-lg font-semibold mb-2'>Products</h2>
                    <div className='overflow-x-auto'>
                        <table className='border min-w-full'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='p-1 sm:p-2 border text-xs sm:text-sm'>Product</th>
                                    <th className='p-1 sm:p-2 border text-xs sm:text-sm'>Qty</th>
                                    <th className='p-1 sm:p-2 border text-xs sm:text-sm'>Price (₹)</th>
                                    <th className='p-1 sm:p-2 border text-xs sm:text-sm'>Total (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((p) => (
                                    <tr key={p.productId} className='text-center'>
                                        <td className='p-1 sm:p-2 border text-xs sm:text-sm'>{p.name}</td>
                                        <td className='p-1 sm:p-2 border text-xs sm:text-sm'>{p.qty}</td>
                                        <td className='p-1 sm:p-2 border text-xs sm:text-sm'>{p.price}</td>
                                        <td className='p-1 sm:p-2 border text-xs sm:text-sm'>{p.qty * p.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='mb-4 p-4 border rounded bg-gray-50'>
                    <h2 className='text-lg font-semibold mb-2'>Payment Information</h2>
                    <p className='text-sm sm:text-base'><strong>Payment Method : </strong>{order.paymentMethod}</p>
                    <p className='text-sm sm:text-base'><strong>Payment Status : </strong>{order.paymentStatus}</p>
                    <p className='text-sm sm:text-base'><strong>Total Amount : </strong>₹{order.totalAmount}</p>
                    <p className='text-sm sm:text-base'><strong>Discount : </strong>₹{order.discount}</p>
                    <p className='text-sm sm:text-base'><strong>Tax : </strong>₹{order.tax}</p>
                    <p className='text-sm sm:text-base'><strong>Shipping Cost : </strong>₹{order.shippingCost}</p>
                    <p className='text-sm sm:text-base'><strong>Grand Total : </strong>₹{order.grandTotal}</p>
                </div>
                <div className='mb-4 p-4 border rounded bg-gray-50'>
                    <h2 className='text-lg font-semibold mb-2'>Order Infromation</h2>
                    <p className='text-sm sm:text-base'><strong>Order Status : </strong>{order.orderStatus}</p>
                    <p className='text-sm sm:text-base'><strong>Tracking Number : </strong>{order.trackingNumber || "Not Available"}</p>
                    <p className='text-sm sm:text-base'><strong>Order Notes : </strong>{order.orderNotes || "None"}</p>
                    <p className='text-sm sm:text-base'><strong>Created At : </strong>{new Date(order.createdAt).toLocaleString("en-IN")}</p>
                    <p className='text-sm sm:text-base'><strong>Updated At : </strong>{new Date(order.updatedAt).toLocaleString("en-IN")}</p>
                </div>
                <button
                    onClick={() => navigate("/orderList")}
                    className='mt-4 bg-blue-700 text-white px-4 py-2 rounded text-center block mx-auto hover:bg-blue-900 dark:bg-orange-500 dark:hover:bg-orange-700'
                >
                    Back to Orders
                </button>
            </div>
        </div>
    )
}

export default OrderDetails;