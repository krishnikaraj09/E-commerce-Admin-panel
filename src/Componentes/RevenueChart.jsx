import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend
);

const RevenueChart = () => {
    const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

    const data = {
        labels,
        datasets: [
            {
                label: "Revenue 2024",
                data: [30000, 29000, 35000, 40000, 28000, 47000],
                borderColor: "rgb(74,103,65)",
                backgroundColor: "rgba(54, 162, 235, 0.4)",
                tension: 0.4,
                borderWidth: 3,
            },
            {
                label: "Revenue 2025",
                data: [40000, 39000, 25000, 24000, 44000, 44000],
                borderColor: "rgb(128, 0, 128)",
                backgroundColor: "rgba(54, 162, 235, 0.4)",
                tension: 0.4,
                borderWidth: 3,
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Revenue Comparison (2024 vs 2025)",
            },
        },
    };
    return (
        <div className="bg-white p-4 rounded-xl shadow dark:bg-white/90 min-h-[300px] max-h-[500px] sm:min-h-[350px] sm:max-h-[450px]">
            <Line data={data} options={options} className="h-auto" />
        </div>
    )
}

export default RevenueChart;