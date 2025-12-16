import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByLocation = () => {
    const labels = ["Delhi", "Mumbai", "Pune", "Bangalore", "Chennai", "Jodhpur"];
    const data = {
        labels,
        datasets: [{
            label: 'Sales',
            data: [1200, 900, 700, 1100, 800, 1000],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(193, 225, 193)',
                'rgb(160,32,240)',
                'rgb(0,128,0)',
                'rgb(255, 205, 86)'
            ],
            borderWidth: 2
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };
    return (
        <div className="bg-white p-4 rounded-xl shadow dark:bg-white/90 min-h-[300px] max-h-[500px] sm:min-h-[350px] sm:max-h-[450px]">
            <p className="text-sm font-bold text-gray-500 text-center mb-1">Sales By Location</p>
            <Doughnut data={data} options={options} className="items-center justify-center" />
        </div>
    )
}

export default SalesByLocation;