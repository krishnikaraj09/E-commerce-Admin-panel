export const validateSettings = (s) => {
    let error = {};

    // General Settings
    if (!s.storeName?.trim())
        error.storeName = "**Store name is required";
    else if (s.storeName.trim().length < 3)
        error.storeName = "**Store name must be at least 3 characters";

    if (!s.email?.trim())
        error.email = "**Email is required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s.email.trim()))
        error.email = "**Invalid email format";

    if (!s.phone?.trim())
        error.phone = "**Phone number is required";
    else if (!/^\+?[1-9][0-9]{7,14}$/.test(s.phone.trim()))
        error.phone = "**Enter a valid phone number";

    const addressRegex = /^[A-Za-z0-9\s,.-/#]{10,}$/;
    if (!s.address?.trim())
        error.address = "**Address is required";
    else if (!addressRegex.test(s.address.trim()))
        error.address = "**Enter a valid address";

    // Account Setting
    if (!s.userName?.trim())
        error.userName = "**User name is required";
    else if (s.userName.trim().length < 3)
        error.userName = "**User name must be at least 3 characters";

    if (!s.userEmail?.trim())
        error.userEmail = "**Email is required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s.userEmail.trim()))
        error.userEmail = "**Invalid email format";

    if (!s.password?.trim())
        error.password = "**Password is required";
    else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(s.password.trim()))
        error.password = "**Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";

    return error;
};