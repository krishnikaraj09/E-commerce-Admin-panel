import { Link } from "react-router-dom";
import { useState } from "react";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import clicknshop from "../../Assets/clicknshop.png";
import ThemeToggle from "../Theme/ThemeToggle";

function SideBar({ isSidebarOpen, toggleSidebar, onLogout }) {
    const [dropdowns, setDropdowns] = useState({
        products: false,
        orders: false,
        customers: false,
    });

    const toggleDropdown = (key) => {
        setDropdowns(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const block = "block py-2 px-3 text-gray-700 hover:bg-blue-100 hover:text-blue-800 rounded-md transition duration-200 font-medium dark:text-gray-300 dark:hover:text-orange-500";

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 z-50 md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={toggleSidebar}
            >
            </div>

            <div
                className={`fixed md:sticky md:top-0 left-0 h-screen w-60 bg-white shadow-lg  p-4 overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    dark:bg-blue-950`}
            >
                <div className="flex items-start justify-center mb-6">
                    <img src={clicknshop} alt="img" className="dark:invert" />
                    <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={toggleSidebar}>
                        <CloseIcon />
                    </button>
                </div>

                <ul className="space-y-3">
                    <li><Link to="/" className={block}><DashboardOutlinedIcon /> DashBoard</Link></li>

                    <li>
                        <button onClick={() => toggleDropdown('products')} className={`${block} flex items-center justify-between w-full`}>
                            <span><Inventory2OutlinedIcon /> Products</span>
                            {dropdowns.products ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        {dropdowns.products && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li><Link to="/productList" className={`${block} text-sm`}>Product List</Link></li>
                                <li><Link to="/categories" className={`${block} text-sm`}>Categories</Link></li>
                                <li><Link to="/addProduct" className={`${block} text-sm`}>Add Product</Link></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <button onClick={() => toggleDropdown('orders')} className={`${block} flex items-center justify-between w-full`}>
                            <span><LocalGroceryStoreOutlinedIcon /> Orders</span>
                            {dropdowns.orders ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        {dropdowns.orders && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li><Link to="/orderList" className={`${block} text-sm`}>Order List</Link></li>
                                <li><Link to="/addOrder" className={`${block} text-sm`}>Add Order</Link></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <button onClick={() => toggleDropdown('customers')} className={`${block} flex items-center justify-between w-full`}>
                            <span><GroupOutlinedIcon /> Customers</span>
                            {dropdowns.customers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        {dropdowns.customers && (
                            <ul className="ml-4 mt-2 space-y-1">
                                <li><Link to="/customerList" className={`${block} text-sm`}>Customer List</Link></li>
                            </ul>
                        )}
                    </li>

                    <li><Link to="/report" className={block}><DonutSmallOutlinedIcon /> Report Analysis</Link></li>
                    <li><Link to="/settings" className={block}><SettingsOutlinedIcon /> Settings</Link></li>
                    <li><div className={block}><p className="flex justify-between">Theme<ThemeToggle /></p></div></li>
                    <li>
                        <button
                            onClick={onLogout}
                            className="block py-2 px-3 text-red-600 hover:bg-red-100 rounded-md font-medium w-full text-left 
                   dark:text-red-600 dark:hover:text-red-800"
                        >
                            <LogoutOutlinedIcon /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SideBar;

