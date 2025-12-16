import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyTarget = () => {
    const targetPercent = 75.34;
    const remaining = 100 - targetPercent;

    const data = {
        datasets: [
            {
                data: [targetPercent, remaining],
                backgroundColor: ["#6a1bff", "#e5e5e5"],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                cutout: "75%",
            },
        ],
    };

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow w-full dark:bg-white/90">
            <h2 className="font-semibold text-lg">Monthly Target</h2>
            <p className="text-gray-500 text-sm">Target you’ve set for each month</p>

            <div className="flex justify-center mt-3">
                <div className="relative w-48">
                    <Doughnut data={data} options={options} />

                    {/* Center Number */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{targetPercent}%</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 rounded mt-1">
                            +12%
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-center mt-3 text-sm text-gray-600">
                You earn $3267 today, it's higher than last month. Keep up your good trends!
            </p>

            {/* Bottom Info */}
            <div className="grid grid-cols-3 text-center mt-4 text-sm">
                <div>
                    <p className="text-gray-500">Target</p>
                    <p className="font-semibold">₹25k <span className="text-red-500">↓</span></p>
                </div>
                <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">₹18k <span className="text-red-500">↓</span></p>
                </div>
                <div>
                    <p className="text-gray-500">Today</p>
                    <p className="font-semibold">₹1.8k <span className="text-green-500">↑</span></p>
                </div>
            </div>
        </div>
    );
};

export default MonthlyTarget;
