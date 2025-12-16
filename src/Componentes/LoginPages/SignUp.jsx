import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { validateUserName, validateEmail, validatePassword, validConfirmPassword } from '../../Validation/authValidation';

const SignUp = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userNameError = validateUserName(userName);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validConfirmPassword(password, confirmPassword);
        setError({ userName: userNameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError })
        if (!userNameError && !emailError && !passwordError && !confirmPasswordError) {
            console.log("Sign up successful.");
            //navigate("/signin");

            // Store in local storage
            let existingUsers = [];
            try {
                const storedAdmins = localStorage.getItem("admins");
                existingUsers = storedAdmins ? JSON.parse(storedAdmins) : [];
            } catch (error) {
                console.error("Error parsing admins from localStorage:", error);
                existingUsers = [];
            }
            const newUser = { userName, email, password };
            existingUsers.push(newUser);
            localStorage.setItem("admins", JSON.stringify(existingUsers));
            alert("Sign up successful! Please login.");
            navigate("/login");
        }
    };

    const textBox = "flex items-center bg-white rounded-lg w-72 px-3 py-2 focus-within:ring-2 focus-within:ring-black";

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
            }}>
            <div className='absolute inset-0 bg-black/50'></div>
            <div className="relative w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/3 flex flex-col items-center justify-center p-6 m-4 gap-5 bg-white/40 rounded-2xl shadow-2xl">
                <h1 className="font-bold text-3xl text-white p-3 text-center">
                    Sign Up
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center gap-4">
                    <div className={textBox}>
                        <PersonIcon className="mr-2" />
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="flex-1 outline-none bg-transparent"
                        />
                    </div>
                    {error.userName && <p className='text-red-800 text-base font-semibold text-center'>{error.userName}</p>}
                    <div className={textBox}>
                        <EmailIcon className="mr-2" />
                        <input
                            type=""
                            placeholder="Enter Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 outline-none text-gray-700 bg-transparent"
                        />
                    </div>
                    {error.email && <p className='text-red-800 text-base font-semibold text-center'>{error.email}</p>}
                    <div className={textBox}>
                        <LockIcon className="mr-2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 outline-none text-gray-700 bg-transparent"
                        />
                        <IconButton onClick={handleClickShowPassword} size="small" className="p-0 ml-2">
                            {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                        </IconButton>
                    </div>
                    {error.password && <p className='text-red-800 text-base font-semibold text-center'>{error.password}</p>}
                    <div className={textBox}>
                        <LockIcon className="mr-2" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="flex-1 outline-none text-gray-700 bg-transparent"
                        />
                        <IconButton onClick={handleClickShowConfirmPassword} size="small" className="p-0 ml-2">
                            {showConfirmPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                        </IconButton>
                    </div>
                    {error.confirmPassword && <p className='text-red-800 text-base font-semibold text-center'>{error.confirmPassword}</p>}
                    <button
                        className='w-32 px-4 py-2 m-4 border border-gray-300 rounded-3xl bg-blue-600 text-white border-none font-semibold'
                        type="submit">
                        SIGN UP
                    </button>
                    <p className='text-lg font-bold'>If you already have a account. Please <Link to="/signin" className="text-blue-800 font-bold">sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;