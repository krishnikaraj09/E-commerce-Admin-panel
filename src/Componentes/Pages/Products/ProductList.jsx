import productData from "../../../Data/product.json";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const itemsPerPage = 8;

    const navigate = useNavigate();

    useEffect(() => {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        if (products.length === 0) {
            products = productData;
            localStorage.setItem("products", JSON.stringify(products));
        }
        setProduct(products);
    }, []);

    const filteredProducts = product.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // Delete product
    const handleDelete = (id) => {
        const updateProducts = product.filter((p) => p.id !== id);
        setProduct(updateProducts);

        localStorage.setItem("products", JSON.stringify(updateProducts));

        alert("Product Deleted Successfully!!!!");
    };

    useEffect(() => {
        const stored = localStorage.getItem("categories");
        if (stored) {
            try {
                setCategories(JSON.parse(stored));
            } catch (error) {
                console.error("Error parsing categories from localStorage:", error);
                setCategories([]);
            }
        }
    }, []);

    return (
        <div className="bg-white p-2 min-h-screen dark:bg-slate-900">
            <div className="flex items-center justify-between m-1">
                <h1 className="text-2xl font-bold p-6 text-blue-900 dark:text-white">Product List</h1>
                <button
                    onClick={() => navigate("/addProduct")}
                    className="mt-2 p-2 text-sm bg-blue-800 text-white font-semibold w-40 rounded-md hover:bg-blue-900 dark:bg-orange-500 dark:hover:bg-orange-700"
                >
                    <AddIcon /> Add Product
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-4 ml-3">
                <input
                    type="text"
                    placeholder="Search by name or category ...."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="p-2 rounded-lg w-full md:w-1/3 bg-slate-200 outline-blue-900"
                />
                <select
                    value={categoryFilter}
                    onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                    className="border p-3 md:p-2 rounded block max-w-[200px] w-full outline-none cursor-pointer min-h-[44px] text-base"
                >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-collapse cursor-pointer">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-sm uppercase dark:bg-gray-300">
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Stock</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr key={product.id} className="border-b text-gray-600 hover:bg-gray-100 transition duration-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
                                <td className="py-3 px-4"><img src={product.image} alt="img" className="w-14 h-14 m-2 rounded" /></td>
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
                                <td className="py-3 px-4">{product.stock}</td>
                                <td className="py-3 px-4">{product.status}</td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/addProduct/${product.id}`)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/productList/${product.id}`, { state: { from: "productList" } })}
                                            className="text-gray-600 hover:text-gray-800 dark:text-black"
                                        >
                                            <VisibilityIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {paginatedProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 dark:bg-white/70">
                        <div className="flex items-center gap-4">
                            <img src={product.image} alt="img" className="w-16 h-16 rounded" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.category}</p>
                                <p className="text-lg font-bold text-blue-600">₹{product.price.toFixed(2)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                                    <span className="text-sm text-gray-600">Status: {product.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => navigate(`/addProduct/${product.id}`)}
                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                            >
                                <EditIcon />
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                                <DeleteIcon />
                            </button>
                            <button
                                onClick={() => navigate(`/productList/${product.id}`, { state: { from: "productList" } })}
                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
                            >
                                <VisibilityIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 gap-5">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded bg-blue-800 text-white disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-700"
                >
                    Prev
                </button>
                <span className="px-3 py-1 border rounded bg-gray-300">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded bg-blue-800 text-white disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-700"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ProductList;