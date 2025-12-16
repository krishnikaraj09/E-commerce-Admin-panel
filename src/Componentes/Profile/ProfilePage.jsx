import { useState, useRef, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const ProfilePage = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef();

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setFile(savedImage);
        }
    }, []);

    // Convert image to Base64
    function convertToBase64(fileInput) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    async function handleChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];

            const base64 = await convertToBase64(imageFile);

            localStorage.setItem("profileImage", base64);
            setFile(base64);
        }
    }

    return (
        <div className="p-4 md:p-6 flex justify-center dark:bg-slate-900 min-h-screen">
            <div className="w-full max-w-xl">

                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleChange}
                />

                <div className="relative w-32 h-32 mx-auto mt-6">
                    <div className="w-full h-full rounded-full border overflow-hidden flex items-center justify-center bg-gray-100">
                        {file ? (
                            <img src={file} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <AccountCircleIcon sx={{ fontSize: 130, color: "gray" }} />
                        )}
                    </div>

                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-1 right-1 bg-gray-900 dark:bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center shadow cursor-pointer"
                    >
                        <AddIcon sx={{ fontSize: 22 }} />
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div
                        className="cursor-pointer flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                        onClick={() => navigate("/editprofile")}
                    >
                        <div className="flex items-center gap-4">
                            <PersonOutlinedIcon sx={{ fontSize: 30 }} />
                            <span className="font-semibold text-lg md:text-xl">Edit Profile</span>
                        </div>
                        <ArrowForwardIosOutlinedIcon sx={{ fontSize: 24 }} />
                    </div>

                    <div
                        className="cursor-pointer flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                        onClick={() => navigate("/address")}
                    >
                        <div className="flex items-center gap-4">
                            <LocationOnOutlinedIcon sx={{ fontSize: 30 }} />
                            <span className="font-semibold text-lg md:text-xl">Saved Addresses</span>
                        </div>
                        <ArrowForwardIosOutlinedIcon sx={{ fontSize: 24 }} />
                    </div>

                </div>
            </div>
        </div>
    );

};

export default ProfilePage;
