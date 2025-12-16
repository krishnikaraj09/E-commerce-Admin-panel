import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import SizesContext from '../../../context/SizesContext';
import CategoryJSON from '../../../Data/categorydata.json';

const Category = () => {
    const navigate = useNavigate();
    const { setSizes } = useContext(SizesContext);

    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ name: "", image: "" });

    // Load categories from localStorage or fallback to JSON
    useEffect(() => {
        const stored = localStorage.getItem("categories");
        if (stored) {
            try {
                setCategories(JSON.parse(stored));
            } catch (error) {
                console.error("Error parsing localStorage:", error);
                setCategories(CategoryJSON);
                localStorage.setItem("categories", JSON.stringify(CategoryJSON));
            }
        } else {
            setCategories(CategoryJSON);
            localStorage.setItem("categories", JSON.stringify(CategoryJSON));
        }
    }, []);

    // Save to localStorage
    const saveToLocalStorage = (updatedCategories) => {
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    // Convert file to Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle image change
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        }
    };

    // Add/Edit Save
    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.image) {
            return alert("All fields are required!");
        }

        let updated = [...categories];

        if (editIndex !== null) {
            updated[editIndex] = { ...formData, id: updated[editIndex].id };
        } else {
            const maxId = categories.length > 0 ? Math.max(...categories.map(c => Number(c.id))) : 0;
            updated.push({ ...formData, id: maxId + 1 });
        }

        setCategories(updated);
        saveToLocalStorage(updated);

        // Update sizes
        setSizes(prev => {
            const copy = JSON.parse(JSON.stringify(prev || {}));
            const newName = formData.name;
            const originalName = editIndex !== null ? categories[editIndex]?.name : null;

            if (originalName && originalName !== newName) {
                if (copy[originalName]) {
                    copy[newName] = copy[originalName];
                    delete copy[originalName];
                } else if (!copy[newName]) {
                    copy[newName] = {};
                }
            } else {
                if (!copy[newName]) copy[newName] = {};
            }
            return copy;
        });

        setFormData({ name: "", image: "" });
        setEditIndex(null);
        setShowForm(false);
    };

    // Delete category
    const handleDelete = (index) => {
        if (!window.confirm("Delete this category?")) return;

        const deleted = categories[index];
        const updated = categories.filter((_, i) => i !== index);

        setCategories(updated);
        saveToLocalStorage(updated);

        setSizes(prev => {
            const copy = JSON.parse(JSON.stringify(prev || {}));
            if (deleted?.name && copy[deleted.name]) {
                delete copy[deleted.name];
            }
            return copy;
        });
    };

    // Edit category
    const handleEdit = (category, index) => {
        setEditIndex(index);
        setFormData(category);
        setShowForm(true);
    };

    return (
        <div className='bg-white p-4 dark:bg-slate-900 min-h-screen'>
            <div className='flex justify-between items-baseline'>
                <h1 className="text-2xl font-bold p-6 text-blue-900 dark:text-white">Categories</h1>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditIndex(null);
                        setFormData({ name: "", image: "" });
                    }}
                    className='mt-2 p-2 text-sm bg-green-700 text-white font-semibold w-20 rounded-md hover:bg-green-900'
                >
                    Add
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSave} className='border p-4 mb-6 rounded-md bg-yellow-100 w-full sm:w-96'>
                    <h2 className='text-lg font-semibold mb-2'>
                        {editIndex !== null ? "Edit Category" : "Add Category"}
                    </h2>

                    <input
                        type='text'
                        placeholder='Category Name'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='border p-2 mb-2 w-full rounded-md'
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-black rounded w-full p-2 dark:text-black"
                    />
                    {formData.image && (
                        <img src={formData.image} alt="Uploaded" className="my-2 max-h-20" />
                    )}

                    <div className='flex gap-2'>
                        <button type='submit' className='bg-blue-700 text-white p-2 rounded-md hover:bg-blue-900'>
                            {editIndex !== null ? "Save Changes" : "Add Category"}
                        </button>

                        <button
                            type='button'
                            onClick={() => setShowForm(false)}
                            className='bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
                {categories.length === 0 ? (
                    <p>No Category Found</p>
                ) : (
                    categories.map((category, index) => (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/categories/${category.id}`)}
                            className="bg-zinc-100 shadow-md rounded-md overflow-hidden cursor-pointer hover:bg-zinc-200 relative"
                        >
                            <img src={category.image} alt={category.name} className="w-full h-36 object-cover" />
                            <h1 className='text-xl text-blue-950 font-semibold m-2'>{category.name}</h1>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(category, index); }}
                                className="absolute top-2 left-2 bg-blue-700 text-white p-1 px-2 rounded-md hover:bg-blue-900 text-sm"
                            >
                                <EditIcon />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                                className="absolute top-2 right-2 bg-red-700 text-white p-1 px-2 rounded-md hover:bg-red-900 text-sm"
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Category;
