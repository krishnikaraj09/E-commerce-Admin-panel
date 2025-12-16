export const validateProfile=(p)=>{
    let errors={};

    // First Name
    if (!p.firstName?.trim())
        errors.firstName = "**First name is required";
    else if (p.firstName.trim().length < 3)
        errors.firstName = "**First name must be at least 3 characters";

    // Last Name
    if (!p.lastName?.trim())
        errors.lastName = "**Last name is required";
    else if (p.lastName.trim().length < 3)
        errors.lastName = "**Last name must be at least 3 characters";

    // Phone Number
    if (!p.phone?.trim())
        errors.phone = "**Phone number is required";
    else if (!/^\+?[1-9][0-9]{7,14}$/.test(p.phone.trim()))
        errors.phone = "**Enter a valid phone number";
    
    // Email
    if (!p.email?.trim())
        errors.email = "**Email is required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(p.email.trim()))
        errors.email = "**Invalid email format";

    return errors;
}