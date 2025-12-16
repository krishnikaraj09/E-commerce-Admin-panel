export const validateAddProductForm = (p) => {
    let errors = {};

    // Product Name
    if (!p.productName?.trim())
        errors.productName = "**Product name is required";
    else if (p.productName.trim().length < 3)
        errors.productName = "**Product name must be at least 3 characters";

    // SKU
    if (!p.productSKU?.trim())
        errors.productSKU = "**SKU is required";
    else if (!/^[a-zA-Z0-9-]+$/.test(p.productSKU.trim()))
        errors.productSKU = "**SKU must be alphanumeric (letters, numbers, hyphen)";

    // Brand
    if (!p.brand?.trim())
        errors.brand = "**Brand is required";
    else if (p.brand.trim().length < 2)
        errors.brand = "**Brand must be at least 2 characters";

    // Category
    if (!p.category?.trim())
        errors.category = "**Please select a category";

    // Category Id
    if (!p.categoryId) errors.categoryId = "**Category ID is required";
    else if (Number(p.categoryId) <= 0)
        errors.categoryId = "**Category ID must be greater than 0";

    // Sub Category
    if (!p.subCategory?.trim())
        errors.subCategory = "**Sub Category is required";

    // Sub-Sub Category
    if (!p.subSubCategory?.trim())
        errors.subSubCategory = "**Sub Sub Category is required";

    // Main Price
    if (!p.oldPrice)
        errors.oldPrice = "**Main price is required";
    else if (p.oldPrice <= 0)
        errors.oldPrice = "**Main price must be greater than 0";

    // Discount
    if (p.discount === "" || p.discount === null)
        errors.discount = "**Discount is required";
    else if (p.discount < 0 || p.discount > 90)
        errors.discount = "**Discount must be between 0–90%";

    // Rating
    if (p.rating === "" || p.rating === null)
        errors.rating = "**Rating is required";
    else if (p.rating < 0 || p.rating > 5)
        errors.rating = "**Rating must be between 0–5";

    // Stock
    if (p.stock === "" || p.stock === null)
        errors.stock = "**Stock is required";
    else if (p.stock < 0)
        errors.stock = "**Stock cannot be negative";

    // Main image
    if (!p.image)
        errors.image = "**Main image is required";

    // Gallery
    if (!Array.isArray(p.gallery) || p.gallery.length === 0)
        errors.gallery = "**At least one gallery image is required";
    else if (p.gallery.some(g => !g || g.trim?.() === ""))
        errors.gallery = "**Gallery images cannot be empty";


    // Tags array
    if (!p.tags || p.tags.length === 0)
        errors.tags = "**At least one tag is required";
    else if (p.tags.some(t => !t.trim()))
        errors.tags = "**Tags cannot be empty";

    // Color array
    if (!p.color || p.color.length === 0)
        errors.color = "**At least one color is required";
    else if (p.color.some(c => !c.trim()))
        errors.color = "**Color cannot be empty";

    // Size array
    if (!p.size || p.size.length === 0)
        errors.size = "**At least one size is required";
    else if (p.size.some(s => !s.trim()))
        errors.size = "**Size cannot be empty";

    // Full Description
    if (!p.description?.trim())
        errors.description = "**Description is required";
    else if (p.description.trim().length < 20)
        errors.description = "**Description must be at least 20 characters";

    // Status
    if (!p.status?.trim())
        errors.status = "**Status is required";

    return errors;
};
