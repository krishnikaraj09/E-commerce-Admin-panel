import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAddress } from '../../Validation/addressValidation';

const SavedAddresses = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        pin: "",
        state: "",
        city: "",
        house: "",
        area: "",
        addressType: ""
    });
    const [error, setError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const vError = validateAddress(address);
        setError(vError);

        if (Object.keys(vError).length > 0) {
            console.log("Validation Failed: ", error)
            return;
        }
        alert("Address Submitted Successfully!");
        setAddress({
            fullName: "",
            phone: "",
            pin: "",
            state: "",
            city: "",
            house: "",
            area: "",
            addressType: ""
        });
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
                    className='space-y-5 grid'
                >
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.fullName}
                        onChange={(e) =>
                            setAddress({ ...address, fullName: e.target.value })
                        }
                    />
                    {error.fullName && <p className='text-red-500'>{error.fullName}</p>}
                    <input
                        type="number"
                        placeholder='Phone Number'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    />
                    {error.phone && <p className='text-red-500'>{error.phone}</p>}
                    <input
                        type="number"
                        placeholder='Pin Code'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.pin}
                        onChange={(e) => setAddress({ ...address, pin: e.target.value })}
                    />
                    {error.pin && <p className='text-red-500'>{error.pin}</p>}
                    <input
                        type="text"
                        placeholder='State'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                    {error.state && <p className='text-red-500'>{error.state}</p>}
                    <input
                        type="text"
                        placeholder='City'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                    {error.city && <p className='text-red-500'>{error.city}</p>}
                    <input
                        type="text"
                        placeholder='House No. Building Name'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.house}
                        onChange={(e) => setAddress({ ...address, house: e.target.value })}
                    />
                    {error.house && <p className='text-red-500'>{error.house}</p>}
                    <input
                        type="text"
                        placeholder='Road name, Area, Colony'
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.area}
                        onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    />
                    {error.area && <p className='text-red-500'>{error.area}</p>}
                    <select 
                        className='w-full outline-none text-lg border rounded-lg px-3 py-2 bg-white shadow-sm'
                        value={address.addressType}
                        onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                    >
                        <option value="">Type of Address</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                    </select>
                    {error.addressType && <p className='text-red-500'>{error.addressType}</p>}
                    <button
                        className='w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition dark:bg-orange-500 dark:hover:bg-orange-700'
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SavedAddresses;