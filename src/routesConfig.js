import Dashboard from "./Componentes/Pages/Dashboard/Dashboard";
import ProductList from "./Componentes/Pages/Products/ProductList";
import Category from "./Componentes/Pages/Products/Category";
import SubCategory from "./Componentes/Pages/Products/SubCategory";
import SubSubCategory from "./Componentes/Pages/Products/SubSubCategory";
import ProductDetails from "./Componentes/Pages/Products/ProductDetails";
import AddProduct from "./Componentes/Pages/Products/AddProduct";
import OrderList from "./Componentes/Pages/Orders/OrderList";
import OrderDetails from "./Componentes/Pages/Orders/OrderDetails";
import CustomerList from "./Componentes/Pages/Customers/CustomerList";
import CustomerDetails from "./Componentes/Pages/Customers/CustomerDetails";
import ReportAnalysis from "./Componentes/Pages/Reportanalysis/ReportAnalysis";
import Settings from "./Componentes/Pages/Setting/Settings";
import ManageSizes from "./Componentes/Pages/Setting/ManageSizes";
import SignIn from "./Componentes/LoginPages/SignIn";
import SignUp from "./Componentes/LoginPages/SignUp"
import AddOrder from "./Componentes/Pages/Orders/AddOrder";
import NotificationPage from "./Componentes/Notifications/Notification";
import ProfilePage from "./Componentes/Profile/ProfilePage";
import EditProfile from "./Componentes/Profile/EditProfile";
import SavedAddresses from "./Componentes/Profile/SavedAddresses";
import CategoryProduct from "./Componentes/Pages/Products/CategoryProduct";

export const routes = [
  { path: "/signin", title: "Sign In", element: <SignIn /> },
  { path: "/signup", title: "Sign Up", element: <SignUp /> },
  { path: "/", title: "Dashboard", element: <Dashboard /> },
  { path: "/productList", title: "Product List", element: <ProductList /> },
  { path: "/categories", title: "Categories", element: <Category /> },
  { path: "/categories/:id", title: "Sub Categories", element: <SubCategory /> },
  { path: "/categories/:id/sub/:subId", title: "Sub Categories", element: <SubSubCategory /> },
  { path: "/productList/:id", title: "Product Details", element: <ProductDetails /> },
  { path: "/addProduct", title: "Add Product", element: <AddProduct /> },
  { path: "/addProduct/:id", title: "Edit Product", element: <AddProduct /> },
  { path: "/orderList", title: "Order List", element: <OrderList /> },
  { path: "/addOrder", title: "Add Order", element: <AddOrder /> },
  { path: "/orderList/:id", title: "Order Details", element: <OrderDetails /> },
  { path: "/customerList", title: "Customer List", element: <CustomerList /> },
  { path: "/customerList/:id", title: "Customer Details", element: <CustomerDetails /> },
  { path: "/report", title: "Report Analysis", element: <ReportAnalysis /> },
  { path: "/settings", title: "Settings", element: <Settings /> },
  { path: "/manage-sizes", title: "Manage Sizes", element: <ManageSizes /> },
  { path: "/notification", title: "Notification", element: <NotificationPage /> },
  { path: "/profile", title: "Profile", element: <ProfilePage /> },
  { path: "/editprofile", title: "Edit Profile", element: <EditProfile /> },
  { path: "/address", title: "Saved Address", element: <SavedAddresses /> },
  { path: "/categoryproduct/:categoryName/:id/:parent", title: "Products", element: <CategoryProduct /> }
];
