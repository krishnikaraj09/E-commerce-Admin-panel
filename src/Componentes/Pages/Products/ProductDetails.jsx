import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let products = [];
        try {
            const storedProducts = localStorage.getItem("products");
            products = storedProducts ? JSON.parse(storedProducts) : [];
        } catch (error) {
            console.error("Error parsing products from localStorage:", error);
            products = [];
        }
        const foundProduct = products.find(p => p.id === Number(id));
        setProduct(foundProduct);
        setCurrentImage(foundProduct?.image);
    }, [id]);

    if (!product)
        return <h2 className="dark:text-white">Product not found</h2>;

    return (
        <div className="p-2 bg-white dark:bg-slate-900 dark:text-white">
            <button
                onClick={() => navigate(-1)}
                className="text-lg md:text-xl text-blue-800 dark:text-orange-500"
            >
                ← Back
            </button>
            <div className="m-2 md:m-4 p-2">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row rounded-sm border p-2 bg-gray-200 gap-3 ">
                        <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full md:w-80 h-96 md:h-80 rounded-lg"
                        />
                        {product.gallery && product.gallery.length > 0 && (
                            <div className="max-h-80 overflow-y-auto flex md:flex-col gap-2">
                                {product.gallery.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-20 md:w-24 mt-2 cursor-pointer rounded-lg"
                                        onClick={() => setCurrentImage(url)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mx-4 md:mx-10 gap-3 md:gap-5 mt-4 md:mt-0">
                        <h1 className="font-bold text-2xl md:text-4xl">{product.name}</h1>
                        <h1 className="text-lg md:text-2xl text-gray-900"><strong>Product ID : </strong>{product.id}</h1>
                        <h3 className="text-gray-700 dark:text-gray-300 text-lg md:text-xl"><strong>Brand : </strong>{product.brand}</h3>
                        <h3 className="text-gray-700 dark:text-gray-300 text-lg md:text-xl"><strong>SKU : </strong>{product.sku}</h3>
                        <h3 className="text-gray-700 dark:text-gray-300 text-lg md:text-xl"><strong>Status : </strong>{product.status}</h3>
                        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 mt-2"><strong>Tags : </strong>{product.tags.join(', ')}</p>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={product.rating} precision={0.1} readOnly />
                    </Stack>
                    <span className="text-base md:text-lg font-semibold">{product.rating}</span>
                    <span className="text-base md:text-lg ml-3 font-semibold text-gray-600 dark:text-gray-300">({product.reviews}reviews)</span>
                </div>
                <div className="mt-2">
                    <p className="text-lg md:text-2xl text-gray-800 dark:text-gray-300 font-semibold">Stock Count : {product.stock}</p>
                </div>
                <div className="flex gap-2 items-center mt-2">
                    <span className="text-lg md:text-2xl font-semibold">₹{product.price}</span>
                    <span className="text-lg md:text-2xl text-gray-600 ">₹{product.oldPrice}</span>
                    <span className="text-green-700 font-semibold text-lg md:text-2xl">{product.discount}% Off</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                    <p className="text-lg md:text-2xl font-bold">Colour :</p>
                    {product.color && product.color.map((color, index) => (
                        <div
                            key={index}
                            // Dynamically set background color based on the color name
                            style={{ backgroundColor: color.toLowerCase() }}
                            className={`h-6 md:h-8 w-6 md:w-8 rounded-full shadow-md cursor-pointer transition duration-150 ease-in-outring-2 ring-offset-2 ${color.toLowerCase() === 'white' ? 'ring-gray-400' : 'ring-transparent'}`}
                            title={color}
                        >
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    <p className="text-lg md:text-2xl font-bold">Size :</p>
                    {product.size && product.size.map((size, index) => (
                        <div
                            key={index}
                            className="bg-black text-white text-base md:text-lg font-medium px-2 md:px-3 py-1 rounded-md shadow-sm"
                        >
                            {size}
                        </div>
                    ))}
                </div>
                <h3 className="text-lg md:text-xl mt-3"><strong>Category : </strong>{product.category}</h3>
                <h3 className="text-lg md:text-xl mt-3"><strong>SubCategory: </strong>{product.subCategory}</h3>
                <h1 className="text-2xl md:text-3xl font-bold mt-3 dark:text-gray-400">DESCRIPTION : </h1>
                <p className="text-lg md:text-xl my-2">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetails;