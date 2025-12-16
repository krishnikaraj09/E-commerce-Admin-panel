import { useState, useEffect } from "react";
import { validateOrderForm } from "../../../Validation/addOrderValidation";

const AddOrder = () => {

    const [order, setOrder] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        billingAddress: "",
        shippingAddress: "",
        products: [
            { productId: "", name: "", qty: "", price: "" }
        ],
        paymentMethod: "",
        paymentStatus: "",
        totalAmount: "",
        discount: "",
        tax: "",
        shippingCost: "",
        grandTotal: "",
        orderStatus: "",
        trackingNumber: "",
        orderNotes: "",
        createdAt: "",
        updatedAt: ""
    });

    const [errors, setErrors] = useState({});

    // Calculate totalAmount as sum of product qty * price
    useEffect(() => {
        const total = order.products.reduce((sum, p) => {
            const qty = Number(p.qty) || 0;
            const price = Number(p.price) || 0;
            return sum + qty * price;
        }, 0);
        setOrder(prev => ({ ...prev, totalAmount: total }));
    }, [order.products]);

    // Calculate grandTotal as totalAmount - discount + tax + shippingCost
    useEffect(() => {
        const discount = Number(order.discount) || 0;
        const tax = Number(order.tax) || 0;
        const shippingCost = Number(order.shippingCost) || 0;
        const grandTotalCalc = order.totalAmount - discount + tax + shippingCost;
        setOrder(prev => ({ ...prev, grandTotal: grandTotalCalc }));
    }, [order.totalAmount, order.discount, order.tax, order.shippingCost]);

    const addProductRow = () => {
        setOrder({
            ...order,
            products: [...order.products, { productId: "", name: "", qty: "", price: "" }]
        });
    };


    const updateProductField = (index, field, value) => {
        const updatedProducts = [...order.products];
        updatedProducts[index][field] = value;

        setOrder({ ...order, products: updatedProducts });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const vErrors = validateOrderForm(order);
        setErrors(vErrors);

        if (Object.keys(vErrors).length > 0) {
            console.log("Validation Failed: ", vErrors);
            return;
        }

        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // Determine new id as last id + 1 if any orders exist, otherwise 1
        const lastId = savedOrders.length > 0 ? Math.max(...savedOrders.map(o => Number(o.id) || 0)) : 0;
        const newId = lastId + 1;

        // Create order object with unique ID
        const newOrder = {
            ...order,
            id: newId,
        };

        // Save back to localStorage
        localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]));

        alert("Order Submitted Successfully!");

    };


    return (
        <div className="p-6 shadow dark:bg-slate-900 ">
            <h1 className="text-2xl font-bold mb-4 text-blue-900 dark:text-white">Add Order</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* CUSTOMER INFORMATION */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-lg dark:text-gray-300">Customer Information</h3>

                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="border p-2"
                            value={order.customerName}
                            onChange={(e) =>
                                setOrder({ ...order, customerName: e.target.value })
                            }
                        />
                        {errors.customerName && <p className="text-red-600">{errors.customerName}</p>}

                        <input
                            type="email"
                            placeholder="Customer Email"
                            className="border p-2"
                            value={order.customerEmail}
                            onChange={(e) =>
                                setOrder({ ...order, customerEmail: e.target.value })
                            }
                        />
                        {errors.customerEmail && <p className="text-red-600">{errors.customerEmail}</p>}

                        <input
                            type="tel"
                            placeholder="Customer Phone"
                            className="border p-2"
                            value={order.customerPhone}
                            onChange={(e) =>
                                setOrder({ ...order, customerPhone: e.target.value })
                            }
                        />
                        {errors.customerPhone && <p className="text-red-600">{errors.customerPhone}</p>}
                    </div>


                    {/* ADDRESS */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-lg dark:text-gray-300">Address</h3>

                        <textarea
                            placeholder="Billing Address"
                            className="border p-2"
                            value={order.billingAddress}
                            onChange={(e) =>
                                setOrder({ ...order, billingAddress: e.target.value })
                            }
                        />
                        {errors.billingAddress && <p className="text-red-600">{errors.billingAddress}</p>}

                        <textarea
                            placeholder="Shipping Address"
                            className="border p-2"
                            value={order.shippingAddress}
                            onChange={(e) =>
                                setOrder({ ...order, shippingAddress: e.target.value })
                            }
                        />
                        {errors.shippingAddress && <p className="text-red-600">{errors.shippingAddress}</p>}
                    </div>
                </div>

                {/* PRODUCTS  */}
                <div>
                    <h3 className="font-semibold text-lg mb-2 dark:text-gray-300">Products</h3>

                    {order.products.map((p, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 mb-3">

                            <input
                                type="number"
                                placeholder="ID"
                                className="border p-2"
                                value={p.productId}
                                onChange={(e) => updateProductField(index, "productId", e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Name"
                                className="border p-2"
                                value={p.name}
                                onChange={(e) => updateProductField(index, "name", e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Qty"
                                className="border p-2"
                                value={p.qty}
                                onChange={(e) => updateProductField(index, "qty", e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2"
                                value={p.price}
                                onChange={(e) => updateProductField(index, "price", e.target.value)}
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addProductRow}
                        className="px-3 py-1 bg-blue-600 text-white rounded dark:bg-orange-500"
                    >
                        + Add Product
                    </button>

                    {errors.products && <p className="text-red-600">{errors.products}</p>}
                </div>



                {/* PAYMENT INFORMATION */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg dark:text-gray-300">Payment Information</h3>

                    <input
                        type="text"
                        placeholder="Payment Method (e.g., Credit Card)"
                        className="border p-2 w-full"
                        value={order.paymentMethod}
                        onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })}
                    />
                    {errors.paymentMethod && <p className="text-red-600">{errors.paymentMethod}</p>}


                    <select
                        className="border p-2 w-full"
                        value={order.paymentStatus}
                        onChange={(e) => setOrder({ ...order, paymentStatus: e.target.value })}
                    >
                        <option value="">Payment Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    {errors.paymentStatus && <p className="text-red-600">{errors.paymentStatus}</p>}

                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="number"
                            placeholder="Total Amount"
                            className="border p-2"
                            value={order.totalAmount}
                            onChange={(e) => setOrder({ ...order, totalAmount: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Discount"
                            className="border p-2"
                            value={order.discount}
                            onChange={(e) => setOrder({ ...order, discount: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Tax"
                            className="border p-2"
                            value={order.tax}
                            onChange={(e) => setOrder({ ...order, tax: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Shipping Cost"
                            className="border p-2"
                            value={order.shippingCost}
                            onChange={(e) => setOrder({ ...order, shippingCost: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Grand Total"
                            className="border p-2"
                            value={order.grandTotal}
                            onChange={(e) => setOrder({ ...order, grandTotal: e.target.value })}
                        />
                    </div>
                </div>


                {/* ORDER INFORMATION */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg dark:text-gray-300">Order Information</h3>

                    <div className="grid grid-cols-3 gap-4">
                        <select
                            className="border p-2"
                            value={order.orderStatus}
                            onChange={(e) => setOrder({ ...order, orderStatus: e.target.value })}
                        >
                            <option value="">Order Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Returned / Refunded">Returned / Refunded</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Tracking Number"
                            className="border p-2"
                            value={order.trackingNumber}
                            onChange={(e) => setOrder({ ...order, trackingNumber: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Order Notes"
                            className="border p-2"
                            value={order.orderNotes}
                            onChange={(e) => setOrder({ ...order, orderNotes: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="dark:text-gray-300">Created At : </label>
                        <input
                            type="datetime-local"
                            className="border p-2"
                            value={order.createdAt}
                            onChange={(e) => setOrder({ ...order, createdAt: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="dark:text-gray-300">Updated At : </label>
                        <input
                            type="datetime-local"
                            className="border p-2"
                            value={order.updatedAt}
                            onChange={(e) => setOrder({ ...order, updatedAt: e.target.value })}
                        />
                    </div>
                </div>


                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 dark:bg-orange-500 dark:hover:bg-orange-700"
                    >
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddOrder;
