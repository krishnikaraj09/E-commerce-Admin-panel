import { useState } from "react";
import { validateSettings } from "../../../Validation/settingsValidation";
import { Link } from "react-router-dom";

const Settings = () => {
    const [setting, setSetting] = useState({
        storeName: "",
        email: "",
        phone: "",
        address: "",
        userName: "",
        userEmail: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const vErrors = validateSettings(setting);
        setErrors(vErrors);

        if (Object.keys(vErrors).length > 0) return;

        // Get all stored settings array
        const saved = JSON.parse(localStorage.getItem("settings")) || [];

        // Add new store setting entry to array
        saved.push(setting);

        // Save updated array
        localStorage.setItem("settings", JSON.stringify(saved));

        alert("Store Setting Saved Successfully!");

        // Clear form
        setSetting({
            storeName: "",
            email: "",
            phone: "",
            address: "",
            userName: "",
            userEmail: "",
            password: ""
        });
    };

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-100 dark:bg-slate-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-blue-900 font-bold text-3xl dark:text-white mb-6 sm:text-4xl">Settings</h1>

                <div className="w-full flex flex-col">
                    <form onSubmit={handleSubmit} className="dark:text-white">

                        <div className="p-6 bg-white my-7 dark:bg-white/15 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 sm:text-2xl">General Settings</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-black">

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Store Name"
                                        value={setting.storeName}
                                        onChange={(e) =>
                                            setSetting({ ...setting, storeName: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.storeName && <p className="text-red-600 mt-1">{errors.storeName}</p>}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        value={setting.email}
                                        onChange={(e) =>
                                            setSetting({ ...setting, email: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        value={setting.phone}
                                        onChange={(e) =>
                                            setSetting({ ...setting, phone: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Address"
                                        value={setting.address}
                                        onChange={(e) =>
                                            setSetting({ ...setting, address: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                        rows={3}
                                    />
                                    {errors.address && <p className="text-red-600 mt-1">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white my-7 dark:bg-white/15 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 sm:text-2xl">Account Settings</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-black">

                                <div>
                                    <input
                                        type="text"
                                        placeholder="UserName"
                                        value={setting.userName}
                                        onChange={(e) =>
                                            setSetting({ ...setting, userName: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.userName && <p className="text-red-600 mt-1">{errors.userName}</p>}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        value={setting.userEmail}
                                        onChange={(e) =>
                                            setSetting({ ...setting, userEmail: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.userEmail && <p className="text-red-600 mt-1">{errors.userEmail}</p>}
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={setting.password}
                                        onChange={(e) =>
                                            setSetting({ ...setting, password: e.target.value })
                                        }
                                        className="border p-3 rounded w-full bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                    />
                                    {errors.password && <p className="text-red-600 mt-1">{errors.password}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-700 transition"
                            >
                                Save
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <Link to="/manage-sizes" className="inline-block w-full px-4 py-2 bg-indigo-600 text-white text-lg rounded hover:bg-indigo-700 dark:bg-orange-500 dark:hover:bg-orange-700 transition">Manage Sizes</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
