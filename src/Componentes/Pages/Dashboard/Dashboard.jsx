import DashBoardCards from "../../DashBoardCards";
import OrdersTable from "../../OrdersTable";
import SalesChart from "../../SalesChart";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:gap-6">
                <DashBoardCards />
                <SalesChart />
                <OrdersTable />
            </div>
        </div>
    )
}

export default Dashboard;