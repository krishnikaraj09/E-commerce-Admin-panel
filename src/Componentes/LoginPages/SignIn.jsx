import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const SignIn = ({ onLoginSuccess,onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const textBox = "flex items-center bg-white rounded-lg w-72 px-3 py-2 focus-within:ring-2 focus-within:ring-black";

    const handleSubmit = (e) => {
        e.preventDefault();

        let admin = [];
        try {
            const storedAdmins = localStorage.getItem("admins");
            admin = storedAdmins ? JSON.parse(storedAdmins) : [];
        } catch (error) {
            console.error("Error parsing admins from localStorage:", error);
            admin = [];
        }

        if (admin.length === 0) {
            alert("No admin found. Please sign up first.");
            return;
        }

        const matchedAdmin = admin.find(
            (adm) => adm.email === email && adm.password === password
        );

        if (matchedAdmin) {
            localStorage.setItem("currentAdmin", JSON.stringify(matchedAdmin));
            onLoginSuccess(matchedAdmin);
            navigate("/");
            if (onLogin) onLogin();
        } else {
            alert("Invalid email and password");
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
            }}>
            <div className='absolute inset-0 bg-black/50'></div>
            <div className="relative w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/3 flex flex-col items-center justify-center p-6 m-4 gap-5 bg-white/30 rounded-2xl shadow-2xl">
                <h1 className="font-bold text-3xl text-white p-3 text-center">
                    Sign In
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <div className={textBox}>
                        <EmailIcon className="mr-2" />
                        <input
                            type="email"
                            placeholder="Enter Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 outline-none text-gray-700"
                        />
                    </div>
                    <div className={textBox}>
                        <LockIcon className="mr-2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 outline-none text-gray-700"
                        />
                        <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </div>
                    <button
                        className='w-32 px-4 py-2 m-4 border border-gray-300 rounded-3xl bg-blue-600 text-white border-none font-semibold'
                        type="submit">
                        SIGN IN
                    </button>
                    <p className='text-lg'>You don't have an account. Please <Link to="/signup" className="text-blue-800 font-bold">sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
