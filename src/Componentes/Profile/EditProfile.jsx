import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ContactsIcon from '@mui/icons-material/Contacts';
import { validateProfile } from '../../Validation/editProfileValidation';
import { useState } from 'react';

const EditProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });
    const [error, setError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const vErrors = validateProfile(profile);
        setError(vErrors);

        if (Object.keys(vErrors).length > 0) {
            console.log("Validation Failed: ", vErrors);
            return;
        }
        alert("Profile Edited Successfully!");
        setProfile({
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        })

    };

    return (
        <div className='p-4 dark:bg-slate-900 min-h-screen'>
            <div>
                <button
                    onClick={() => navigate("/profile")}
                    className="text-xl font-semibold mb-4 inline-block dark:text-orange-500"
                >
                    ← Back
                </button>
            </div>
            <div className='p-6 mx-auto max-w-3xl'>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-5'
                >
                    <div className="flex items-center gap-3 border rounded-lg px-3 py-2 bg-white shadow-sm">
                        <PersonIcon className="text-gray-600" />
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full outline-none text-lg"
                            value={profile.firstName}
                            onChange={(e) =>
                                setProfile({ ...profile, firstName: e.target.value })
                            }
                        />
                    </div>
                    {error.firstName && <p className='text-red-600'>{error.firstName}</p>}
                    <div className='flex items-center gap-3 border rounded-lg px-3 py-2 bg-white shadow-sm'>
                        <PersonIcon className="text-gray-600" />
                        <input
                            type="text"
                            placeholder='Last Name'
                            className="w-full outline-none text-lg"
                            value={profile.lastName}
                            onChange={(e) =>
                                setProfile({ ...profile, lastName: e.target.value })
                            }
                        />
                    </div>
                    {error.lastName && <p className="text-red-600">{error.lastName}</p>}
                    <div className='flex items-center gap-3 border rounded-lg px-3 py-2 bg-white shadow-sm'>
                        <ContactsIcon className="text-gray-600" />
                        <input
                            type="number"
                            placeholder='Phone Number'
                            className="w-full outline-none text-lg"
                            value={profile.phone}
                            onChange={(e) =>
                                setProfile({ ...profile, phone: e.target.value })
                            }
                        />
                    </div>
                    {error.phone && <p className="text-red-600">{error.phone}</p>}
                    <div className='flex items-center gap-3 border rounded-lg px-3 py-2 bg-white shadow-sm'>
                        <EmailIcon className="text-gray-600" />
                        <input
                            type="email"
                            placeholder='Email ID'
                            className="w-full outline-none text-lg"
                            value={profile.email}
                            onChange={(e) =>
                                setProfile({ ...profile, email: e.target.value })
                            }
                        />
                    </div>
                    {error.email && <p className="text-red-600">{error.email}</p>}
                    <button className='w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition dark:bg-orange-500 dark:hover:bg-orange-700'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;