import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../../routesConfig';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const NavBar = ({ toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { loggedInUser } = useContext(UserContext);

    const currentRoute = routes.find((r) => {
        if (r.path.includes(':id')) {
            return matchPath(r.path, location.pathname);
        }
        return r.path === location.pathname;
    });
    const pageTitle = currentRoute ? currentRoute.title : "Dashboard";

    return (
        <div className='w-full flex items-center justify-between bg-white px-6 py-3 sticky top-0 z-40 shadow-sm dark:bg-blue-950 dark:text-white'>
            <div className="flex items-center space-x-3">
                <button onClick={toggleSidebar} className="md:hidden text-gray-700 dark:text-white">
                    <MenuIcon />
                </button>
                <h1 className="text-xl font-semibold text-blue-800 dark:text-orange-500">{pageTitle}</h1>
            </div>

            <div className='hidden md:flex items-center bg-gray-200 rounded-lg w-96 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 dark:text-black dark:focus-within:ring-black'>
                <SearchIcon className="mr-2" />
                <input type="text" placeholder='Search...' className="flex-1 outline-none bg-transparent" />
            </div>

            <div className='flex items-center space-x-6'>
                <button className='relative' onClick={() => navigate("/notification")}>
                    <NotificationsNoneIcon />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                </button>
                <img
                    src="https://cdn.vectorstock.com/i/1000v/00/74/young-man-profile-vector-14770074.jpg"
                    alt="profile"
                    onClick={()=>navigate("/profile")}
                    className="w-9 h-9 rounded-full border border-gray-300 cursor-pointer"
                />
                <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{loggedInUser?.userName || "User"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-200">Admin</p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
