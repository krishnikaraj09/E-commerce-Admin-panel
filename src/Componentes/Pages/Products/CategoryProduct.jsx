import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

const CategoryProduct = () => {
  const { categoryName, id, parent } = useParams();
  const navigate = useNavigate();

  // Load products
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Filter products
  const filteredProducts = products.filter((p) => {
    return (
      p.categoryId === parseInt(id) &&
      p.subCategory?.toLowerCase() === parent?.toLowerCase() &&
      p.subSubCategory?.toLowerCase() === categoryName?.toLowerCase()
    );
  });

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-slate-900">
      <button
        onClick={() => navigate(-1)}
        className="text-xl font-semibold mb-4 inline-block text-blue-800 dark:text-orange-500"
      >
        ← Back
      </button>

      {filteredProducts.length === 0 ? (
        <p className="dark:text-white">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow p-4 dark:bg-white/60"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm">{product.brand}</p>
              <p className="mt-2">{product.shortDescription}</p>
              <div className="flex items-center justify-between">
              <p className="mt-2 font-semibold">₹{product.price}</p>
              <button className="mt-2 text-gray-600 dark:text-white">
                <VisibilityIcon onClick={()=>navigate(`/productList/${product.id}`)}
                />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
