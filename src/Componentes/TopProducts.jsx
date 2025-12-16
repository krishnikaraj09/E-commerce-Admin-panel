import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TopSellingProducts = () => {
    const labels = ["Shoes", "T-Shirts", "Watches", "Bags", "Headphones"];

    const data = {
        labels,
        datasets: [
            {
                label: "Units Sold",
                data: [450, 380, 300, 260, 240],
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Top Selling Products",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow dark:bg-white/90 min-h-[300px] max-h-[500px] sm:min-h-[350px] sm:max-h-[450px]">
            <Bar data={data} options={options} />
        </div>
    );
};

export default TopSellingProducts;
