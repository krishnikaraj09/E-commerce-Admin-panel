import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const cardStyle =
    "bg-white shadow-md rounded-2xl p-4 sm:p-6 w-full max-w-full hover:shadow-lg transition duration-300 dark:bg-white/70";
const heading = "text-lg sm:text-xl font-semibold text-center text-gray-700 mb-4";

const SalesChart = () => {
    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [
            {
                label: "Sales ($)",
                data: [4000, 3000, 4500, 5000, 6543, 3456, 6000, 5632, 4900, 8000],
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.3)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const orderData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [
            {
                label: "Orders",
                data: [200, 150, 300, 400, 180, 250, 350, 450, 160, 550],
                backgroundColor: "#22c55e",
                borderRadius: 6,
            },
        ],
    };

    const productsData = {
        labels: ["Shoes", "Bags", "Watches", "Clothes", "Accessories"],
        datasets: [
            {
                label: "Top Products",
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    "#2563eb",
                    "#22c55e",
                    "#f59e0b",
                    "#8b5cf6",
                    "#ef4444",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
        },
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg min-h-screen overflow-x-hidden dark:bg-white/70">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
                📊 Sales Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

                <div className={cardStyle}>
                    <h2 className={heading}>Sales Overview</h2>
                    <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                        <Line data={salesData} options={options} />
                    </div>
                </div>

                <div className={cardStyle}>
                    <h2 className={heading}>Order Trend</h2>
                    <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                        <Bar data={orderData} options={options} />
                    </div>
                </div>

                <div className={cardStyle}>
                    <h2 className={heading}>Top Selling Products</h2>
                    <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                        <Pie data={productsData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;
