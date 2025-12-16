import DashBoardCards from "../../DashBoardCards";
import RevenueChart from "../../RevenueChart";
import SalesByLocation from "../../SalesByLocation";
import TotalSales from "../../TotalSales";
import TopProducts from "../../TopProducts";
import MonthlyTarget from "../../MonthlyTarget";

const ReportAnalysis = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 dark:bg-slate-900">
            <DashBoardCards />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <RevenueChart />
                <SalesByLocation />
                <TotalSales />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <TopProducts />
                <MonthlyTarget />
            </div>
        </div>
    )
}

export default ReportAnalysis;