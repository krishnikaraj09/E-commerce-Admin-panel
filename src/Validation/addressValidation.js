export const validateAddress = (a) => {
    let errors = {};

    // Full Name
    if (!a.fullName?.trim()) {
        errors.fullName = "**Full name is required";
    } else if (a.fullName.trim().length < 3) {
        errors.fullName = "**Full name must be at least 3 characters";
    }

    // Phone Number
    if (!a.phone?.trim()) {
        errors.phone = "**Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(a.phone.trim())) {
        errors.phone = "**Enter a valid 10-digit phone number";
    }

    // Pin Code
    if (!a.pin?.trim()) {
        errors.pin = "**Pin code is required";
    } else if (!/^\d{6}$/.test(a.pin.trim())) {
        errors.pin = "**Enter a valid 6-digit pin code";
    }

    // State
    if (!a.state?.trim()) {
        errors.state = "**State is required";
    }

    // City
    if (!a.city?.trim()) {
        errors.city = "**City is required";
    }

    // House No / Building Name
    if (!a.house?.trim()) {
        errors.house = "**House / Building name is required";
    }

    // Road Name / Area / Colony
    if (!a.area?.trim()) {
        errors.area = "**Area / Road name is required";
    }

    // Address Type (Home / Work / Other)
    if (!a.addressType?.trim()) {
        errors.addressType = "**Please select address type";
    }

    return errors;
};
