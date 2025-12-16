export const validateUserName = (userName) => {
    if (!userName)
        return "**UserName is required.";
    if (!/^(?=.{5,20}$)(?![_. -])(?!.*[_. -]{2})[a-zA-Z0-9_. -]+(?<![_. -])$/.test(userName))
        return "**Username must be 5-20 characters, cannot start/end with _ . - or have consecutive _ . -";
};

export const validateEmail = (email) => {
    if (!email)
        return "**Email is required.";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return "**Invalid email format.";
};

export const validatePassword = (password) => {
    if (!password)
        return "**Password is required.";
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))
        return "**Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
};

export const validConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword)
        return "**Confirm Password is required.";
    if (password !== confirmPassword)
        return "**password doesn't match.";
};
