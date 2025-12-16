import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateAddProductForm } from "../../../Validation/addProductValidation";
import SizesContext from "../../../context/SizesContext";

// Helper: normalize a string to a simple key
const keyify = (str) => {
	if (!str && str !== 0) return "";
	return String(str).replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

// Helper: find a key in an object matching a name (case/space/punct-insensitive)
const findMatchingKey = (obj, name) => {
	if (!obj || !name) return null;
	const target = keyify(name);
	return Object.keys(obj).find(k => keyify(k) === target) || null;
};

// Get sizes using sizes from context (which loads from localStorage with fallback)
const getSizesFromGroup = (sizesFromContext, cat, subCat, subSubCat) => {
	if (!cat) return [];
	const catKey = findMatchingKey(sizesFromContext, cat);
	if (!catKey) return [];
	const catObj = sizesFromContext[catKey];
	if (!subCat) {
		const all = [];
		Object.values(catObj).forEach(v => {
			if (Array.isArray(v)) all.push(...v);
			else if (typeof v === 'object') Object.values(v).forEach(inner => Array.isArray(inner) && all.push(...inner));
		});
		return Array.from(new Set(all));
	}
	const subKey = findMatchingKey(catObj, subCat);
	if (!subKey) return [];
	const subObj = catObj[subKey];
	if (!subSubCat) {
		const all = [];
		Object.values(subObj).forEach(v => {
			if (Array.isArray(v)) all.push(...v);
			else if (typeof v === 'object') Object.values(v).forEach(iv => Array.isArray(iv) && all.push(...iv));
		});
		return Array.from(new Set(all));
	}
	const subSubKey = findMatchingKey(subObj, subSubCat);
	if (!subSubKey) return [];
	const arr = subObj[subSubKey];
	return Array.isArray(arr) ? arr : [];
};

const AddProduct = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isEdit, setIsEdit] = useState(false);

	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [subSubCategories, setSubSubCategories] = useState([]);
	const [localProducts, setLocalProducts] = useState([]);

	// All Existing state variable
	const [productName, setProductName] = useState("");
	const [productSKU, setProductSKU] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [subSubCategory, setSubSubCategory] = useState("");
	const [price, setPrice] = useState("");
	const [oldPrice, setOldPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [rating, setRating] = useState("");
	const [stock, setStock] = useState("");
	const [image, setImage] = useState("");
	const [gallery, setGallery] = useState([]);
	const [tags, setTags] = useState([]);
	const [color, setColor] = useState([]);
	const [size, setSize] = useState([]);
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");

	const [error, setError] = useState({});

	// Size selection helpers and state (declared early so effects can use them)
	const { sizes: sizesFromContext } = useContext(SizesContext);
	const [availableSizes, setAvailableSizes] = useState([]);

	// Helper to convert file to base64 string
	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	};

	// Handler for main image file input
	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64 = await fileToBase64(file);
			setImage(base64);
		}
	};

	// Handler for gallery multiple files input
	const handleGalleryChange = async (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 0) {
			const base64Images = await Promise.all(files.map(fileToBase64));
			setGallery(base64Images);
		} else {
			setGallery([]);
		}
	};

	// Pre fill form if edit products
	useEffect(() => {
		if (id) {
			setIsEdit(true);
			let products = [];
			try {
				const storedProducts = localStorage.getItem("products");
				products = storedProducts ? JSON.parse(storedProducts) : [];
			} catch (error) {
				console.error("Error parsing products from localStorage:", error);
				products = [];
			}
			const producToEdit = products.find(p => p.id === parseInt(id));
			if (producToEdit) {
				setProductName(producToEdit.name);
				setProductSKU(producToEdit.sku || "");
				setBrand(producToEdit.brand || "");
				setCategory(producToEdit.category || "");
				setCategoryId(producToEdit.categoryId || "");
				setSubCategory(producToEdit.subCategory || "");
				setSubSubCategory(producToEdit.subSubCategory || "");
				setPrice(producToEdit.price || "");
				setOldPrice(producToEdit.oldPrice || "");
				setDiscount(producToEdit.discount || "");
				setRating(producToEdit.rating || "");
				setStock(producToEdit.stock || "");
				setImage(producToEdit.image || "");
				setGallery(producToEdit.gallery || []);
				setTags(producToEdit.tags || []);
				setColor(producToEdit.color || []);
				setSize(producToEdit.size || []);
				setDescription(producToEdit.fullDescription || "");
				setStatus(producToEdit.status || "");
			}
		}
	}, [id]);

	// Auto-calculate price when oldPrice or discount changes
	useEffect(() => {
		if (oldPrice && discount) {
			const calculatedPrice = Number(oldPrice) * (1 - Number(discount) / 100);
			setPrice(calculatedPrice.toFixed(2));
		} else {
			setPrice("");
		}
	}, [oldPrice, discount]);

	// Update subCategories and subSubCategories when category changes
	useEffect(() => {
		const selectedCat = categories.find(c => c.name === category);
		if (selectedCat && selectedCat.subCategories) {
			setSubCategories(selectedCat.subCategories);
		} else {
			setSubCategories([]);
		}
		setSubCategory("");
		setSubSubCategories([]);
		setSubSubCategory("");
		// Reset sizes when category changes
		setSize([]);
		setAvailableSizes([]);
	}, [category, categories]);

	// Update subSubCategories when subCategory changes
	useEffect(() => {
		if (subCategory && subCategories.length > 0) {
			const selectedSubCat = subCategories.find(sc => sc.name === subCategory);
			if (selectedSubCat && selectedSubCat.sub) {
				setSubSubCategories(selectedSubCat.sub);
			} else {
				setSubSubCategories([]);
			}
		} else {
			setSubSubCategories([]);
		}
		setSubSubCategory("");
		// Reset sizes when subcategory changes
		setSize([]);
		setAvailableSizes([]);
	}, [subCategory, subCategories]);

	useEffect(() => {
		const sizes = getSizesFromGroup(sizesFromContext, category, subCategory, subSubCategory);
		setAvailableSizes(sizes);
	}, [category, subCategory, subSubCategory, sizesFromContext]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = {
			productName,
			productSKU,
			brand,
			category,
			categoryId,
			subCategory,
			subSubCategory,
			oldPrice,
			discount,
			rating,
			stock,
			image,
			gallery,
			tags,
			color,
			size,
			description,
			status,
		};

		console.log("Form Data:", formData);

		const validationErrors = validateAddProductForm(formData);
		console.log("Validation Errors:", validationErrors);
		setError(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			console.log("Validation failed, not proceeding with save.");
			return;
		}

		if (isEdit) {
			console.log("Editing product with ID:", id);
			// Update existing product
			const updatedProducts = localProducts.map(p =>
				p.id === parseInt(id)
					? {
						...p,
						name: productName,
						sku: productSKU,
						brand,
						category,
						categoryId: Number(categoryId),
						subCategory,
						subSubCategory,
						price: Number(price),
						oldPrice: Number(oldPrice),
						discount: Number(discount),
						rating: Number(rating),
						stock: Number(stock),
						image,
						gallery,
						tags,
						color,
						size,
						description,
						status,
					}
					: p
			);
			console.log("Updated Products Array:", updatedProducts);
			setLocalProducts(updatedProducts);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			console.log("Product updated in localStorage successfully!");
			alert("Product updated successfully!");
		} else {
			console.log("Adding new product");
			// Add new product
			const newId = localProducts.length > 0 ? Math.max(...localProducts.map(p => p.id)) + 1 : 1;
			const newProduct = {
				id: newId,
				name: productName,
				sku: productSKU,
				brand,
				category,
				categoryId: Number(categoryId),
				subCategory,
				subSubCategory,
				price: Number(price),
				oldPrice: Number(oldPrice),
				discount: Number(discount),
				rating: Number(rating),
				stock: Number(stock),
				image,
				gallery,
				tags,
				color,
				size,
				description,
				status,
			};
			const updatedProducts = [...localProducts, newProduct];
			console.log("New Products Array:", updatedProducts);
			setLocalProducts(updatedProducts);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			console.log("New product added to localStorage successfully!");
			alert("Product added successfully!");
			}

			// After save (add or edit) go to the Product List page instead of navigating back
			navigate("/productList", { replace: true });
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
		const storedProducts = localStorage.getItem("products");
		if (storedProducts) {
			setLocalProducts(JSON.parse(storedProducts));
		}
	}, []);

	return (
		<div className="bg-white p-6 shadow dark:bg-slate-900">
			<h1 className="font-bold text-3xl text-blue-900 dark:text-white">{isEdit ? "Edit Product" : "AddProduct"}</h1>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 max-w-lg pt-10 dark:text-gray-400"
			>
				<div>
					<label className="block mb-1 font-medium">Product Name</label>
					<input
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black" />
					{error.productName && <p className="text-red-500 text-sm font-semibold">{error.productName}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Product SKU</label>
					<input
						type="text"
						value={productSKU}
						onChange={(e) => setProductSKU(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black" />
					{error.productSKU && <p className="text-red-500 text-sm font-semibold">{error.productSKU}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Brand</label>
					<input
						type="text"
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black" />
					{error.brand && <p className="text-red-500 text-sm font-semibold">{error.brand}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Category</label>
					<select
						value={category}
						onChange={(e) => {
							const selectedName = e.target.value;
							setCategory(selectedName);

							const selectedCat = categories.find(c => c.name === selectedName);
							if (selectedCat) {
								setCategoryId(selectedCat.id);
							} else {
								setCategoryId("");
							}
						}}
						className="border border-black rounded w-full p-2 dark:text-black"
					>
						<option value="">Select categories</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.name}>{cat.name}</option>
						))}
					</select>
					{error.category && <p className="text-red-500 text-sm font-semibold">{error.category}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Category ID</label>
					<input
						type="number"
						value={categoryId}
						disabled
						className="border border-black rounded w-full p-2 dark:text-black" />
					{error.categoryId && <p className="text-red-500 text-sm font-semibold">{error.categoryId}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Sub Category</label>
					<select
						value={subCategory}
						onChange={(e) => setSubCategory(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
						disabled={subCategories.length === 0}
					>
						<option value="">Select subcategory</option>
						{subCategories.map((subCat, index) => (
							<option key={index} value={subCat.name}>{subCat.name}</option>
						))}
					</select>
					{error.subCategory && <p className="text-red-500 text-sm font-semibold">{error.subCategory}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Sub Sub Category</label>
					<select
						value={subSubCategory}
						onChange={(e) => setSubSubCategory(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
						disabled={subSubCategories.length === 0}
					>
						<option value="">Select sub-subcategory</option>
						{subSubCategories.map((subSubCat, index) => (
							<option key={index} value={subSubCat.name}>{subSubCat.name}</option>
						))}
					</select>
					{error.subSubCategory && <p className="text-red-500 text-sm font-semibold">{error.subSubCategory}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Main Price (₹)</label>
					<input
						type="number"
						value={oldPrice}
						onChange={(e) => setOldPrice(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.oldPrice && <p className="text-red-500 text-sm font-semibold">{error.oldPrice}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Discount</label>
					<input
						type="number"
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.discount && <p className="text-red-500 text-sm font-semibold">{error.discount}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Price (₹)</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
				</div>
				<div>
					<label className="block mb-1 font-medium">Rating</label>
					<input
						type="number"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.rating && <p className="text-red-500 text-sm font-semibold">{error.rating}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Stock</label>
					<input
						type="number"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.stock && <p className="text-red-500 text-sm font-semibold">{error.stock}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Product Image</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{image && (
						<img
							src={image}
							alt="Uploaded Main"
							className="mt-2 max-h-20"
						/>
					)}
					{error.image && <p className="text-red-500 text-sm font-semibold">{error.image}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Image Gallery (upload multiple)</label>
					<input
						type="file"
						accept="image/*"
						multiple
						onChange={handleGalleryChange}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					<div className="flex flex-wrap gap-2 mt-2">
						{gallery.map((imgSrc, idx) => (
							<img key={idx} src={imgSrc} alt={`Gallery ${idx}`} className="max-h-20" />
						))}
					</div>
					{error.gallery && <p className="text-red-500 text-sm font-semibold">{error.gallery}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Tags (comma-separated)</label>
					<input
						type="text"
						value={tags.join(', ')}
						onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.tags && <p className="text-red-500 text-sm font-semibold">{error.tags}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Sizes</label>
					{availableSizes && availableSizes.length > 0 ? (
						<div className="grid grid-cols-3 gap-2">
							{availableSizes.map((sz) => (
								<label key={sz} className="inline-flex items-center space-x-2">
									<input
										type="checkbox"
										checked={size.includes(sz)}
										onChange={() => {
											if (size.includes(sz)) setSize(size.filter(s => s !== sz));
											else setSize([...size, sz]);
										}}
									/>
									<span className="text-sm">{sz}</span>
								</label>
							))}
						</div>
					) : (
						<div>
							<p className="text-sm text-gray-500">No predefined sizes for selected category. You may enter sizes manually (comma-separated):</p>
							<input
								type="text"
								value={size.join(', ')}
								onChange={(e) => setSize(e.target.value.split(',').map(s => s.trim()))}
								className="border border-black rounded w-full p-2 dark:text-black mt-2"
							/>
						</div>
					)}
					{error.size && <p className="text-red-500 text-sm font-semibold">{error.size}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Colors (comma-separated)</label>
					<input
						type="text"
						value={color.join(', ')}
						onChange={(e) => setColor(e.target.value.split(',').map(c => c.trim()))}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.color && <p className="text-red-500 text-sm font-semibold">{error.color}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					/>
					{error.description && <p className="text-red-500 text-sm font-semibold">{error.description}</p>}
				</div>
				<div>
					<label className="block mb-1 font-medium">Status</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="border border-black rounded w-full p-2 dark:text-black"
					>
						<option>Select Status</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
					{error.status && <p className='text-red-500 text-sm font-semibold'>{error.status}</p>}
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-700"
				>
					{isEdit ? "Update Product" : "Add Product"}
				</button>
			</form>
		</div>
	)
}

export default AddProduct;
