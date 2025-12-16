import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';

const cards = [
    { title: "Total Sales", value: "₹45,300", icon: <AttachMoneyIcon sx={{ color: "#ffbf00", fontSize: 35 }}  />, type: "up", per: "14%" },
    { title: "Total Orders", value: "1,234", icon: <ShoppingCartIcon sx={{ color: "#2e7d32", fontSize: 35 }} />, type: "down", per: "17%" },
    { title: "Revenue", value: "₹82,359", icon: <TrendingUpIcon sx={{ color: "#0288d1", fontSize: 35 }} />, type: "up", per: "11%" },
    { title: "Customers", value: "567", icon: <PeopleAltIcon sx={{ color: "#ed6c02", fontSize: 35 }} />, type: "down", per: "11%" },
    { title: "Total Products", value: "347", icon: <InventoryIcon sx={{ color: "#601a3e", fontSize: 35 }} />, type: "up", per: "19%" },
];

const DashBoardCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-2 sm:p-6">
            {cards.map((card, index) => {
                const isUp = card.type === "up";
                const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon;
                const colorClass = isUp
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-white"
                    : "bg-red-100 text-red-600";

                return (
                    <div key={index}>
                        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-110 transition-all dark:bg-white/70" >
                            <div className="flex justify-between">
                                <p className="text-gray-400 font-semibold dark:text-gray-700">{card.title}</p>
                                <MoreHorizIcon className="cursor-pointer" />
                            </div>
                            <div className="flex my-3 gap-4 sm:gap-5 items-center">
                                <p>{card.icon}</p>
                                <p className="text-lg sm:text-2xl font-semibold">{card.value}</p>
                            </div>
                            <div className="flex gap-2 sm:gap-3 items-center">
                                <div
                                    className={`flex ${colorClass} rounded-md text-center text-xs sm:text-sm p-1 pr-2`}
                                >
                                    <Icon style={{ fontSize: "20px" }} />
                                    {card.per}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-700">in the last month</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashBoardCards;
