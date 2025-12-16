export const validateOrderForm = (o) => {
    let errors = {};

    // CUSTOMER NAME
    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (!o.customerName?.trim())
        errors.customerName = "**Customer name is required";
    else if (!nameRegex.test(o.customerName.trim()))
        errors.customerName = "**Customer name must be at least 3 letters";

    // EMAIL
    if (!o.customerEmail?.trim())
        errors.customerEmail = "**Email is required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(o.customerEmail.trim()))
        errors.customerEmail = "**Invalid email format";

    // PHONE
    if (!o.customerPhone?.trim())
        errors.customerPhone = "**Phone number is required";
    else if (!/^\+?[1-9][0-9]{7,14}$/.test(o.customerPhone.trim()))
        errors.customerPhone = "**Enter a valid phone number";

    // BILLING ADDRESS
    const addressRegex = /^[A-Za-z0-9\s,.-/#]{10,}$/;
    if (!o.billingAddress?.trim())
        errors.billingAddress = "**Billing address is required";
    else if (!addressRegex.test(o.billingAddress.trim()))
        errors.billingAddress = "**Enter a valid billing address";

    // SHIPPING ADDRESS
    if (!o.shippingAddress?.trim())
        errors.shippingAddress = "**Shipping address is required";
    else if (!addressRegex.test(o.shippingAddress.trim()))
        errors.shippingAddress = "**Enter a valid shipping address";

    // PRODUCTS
    if (!o.products || o.products.length === 0) {
        errors.products = "**Add at least one product";
    } else {
        o.products.forEach((p, index) => {
            if (!p.productId) errors[`product_id_${index}`] = "**Product ID required";
            if (!p.name?.trim()) errors[`product_name_${index}`] = "**Product name required";
            if (!p.qty || Number(p.qty) <= 0) errors[`product_qty_${index}`] = "**Quantity must be > 0";
            if (!p.price || Number(p.price) <= 0) errors[`product_price_${index}`] = "**Price must be > 0";
        });
    }

    // PAYMENT METHOD
    if (!o.paymentMethod?.trim())
        errors.paymentMethod = "**Payment method is required";

    // PAYMENT STATUS
    if (!o.paymentStatus?.trim())
        errors.paymentStatus = "**Payment status is required";

    // PAYMENT AMOUNTS
    if (Number(o.totalAmount) < 0)
    errors.totalAmount = "**Total amount cannot be negative";

    if (o.discount && Number(o.discount) < 0)
        errors.discount = "**Invalid discount";

    if (o.tax && Number(o.tax) < 0)
        errors.tax = "**Invalid tax";

    if (o.shippingCost && Number(o.shippingCost) < 0)
        errors.shippingCost = "**Invalid shipping cost";

   if (Number(o.grandTotal) < 0)
    errors.grandTotal = "**Grand total cannot be negative";

    // ORDER STATUS
    if (!o.orderStatus?.trim())
        errors.orderStatus = "**Order status is required";

    // TRACKING NUMBER
    // Make trackingNumber optional
    // if (!o.trackingNumber?.trim())
    //     errors.trackingNumber = "**Tracking number is required";

    // ORDER NOTES
    // Make orderNotes optional
    // if (!o.orderNotes?.trim())
    //     errors.orderNotes = "**Order notes are required";

    // DATES
    if (!o.createdAt)
        errors.createdAt = "**Created date is required";

    if (!o.updatedAt)
        errors.updatedAt = "**Updated date is required";

    return errors;
};
