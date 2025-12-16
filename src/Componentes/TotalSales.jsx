import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalSalesChart = () => {
    const data = {
        labels: ["Online Sales", "Offline Sales"],
        datasets: [
            {
                label: "Total Sales",
                data: [45000, 15000],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Total Sales Breakdown",
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow dark:bg-white/90 min-h-[300px] max-h-[500px] sm:min-h-[350px] sm:max-h-[450px]">
            <Doughnut data={data} options={options} className="items-center justify-center" />
        </div>
    );
};

export default TotalSalesChart;
