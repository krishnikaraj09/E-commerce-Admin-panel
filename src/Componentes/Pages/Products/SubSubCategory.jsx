import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

const SubSubCategory = () => {
    const navigate = useNavigate();
    const { id, subId } = useParams();

    const [subSubCategories, setSubSubCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ name: "", image: "" });

    useEffect(() => {
        let stored = [];
        try {
            const storedCategories = localStorage.getItem("categories");
            stored = storedCategories ? JSON.parse(storedCategories) : [];
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            stored = [];
        }

        const category = stored.find((cat) => cat.id === parseInt(id));
        if (!category) return;

        const subCat = category.subCategories.find((subCat) => subCat.name === subId)

        if (subCat && subCat.sub) {
            setSubSubCategories(subCat.sub);
        } else {
            setSubSubCategories([]);
        }
    }, [id, subId]);

    // Save Back To Local Storage
    const saveToLocalStorage = (updateList) => {
        let stored = [];
        try {
            const storedCategories = localStorage.getItem("categories");
            stored = storedCategories ? JSON.parse(storedCategories) : [];
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            stored = [];
        }

        const categoryIndex = stored.findIndex(cat => cat.id === parseInt(id));

        if (categoryIndex === -1) return;

        const subCatIndex = stored[categoryIndex].subCategories.findIndex(
            (s) => s.name === subId
        );
        if (subCatIndex === -1) return;

        stored[categoryIndex].subCategories[subCatIndex].sub = updateList;

        localStorage.setItem("categories", JSON.stringify(stored));
    };

    // Add/Edit Save
    const handleSave = (e) => {
        e.preventDefault();

        if (!formData.name | !formData.image) {
            return alert("All fields are required!");
        }
        let updated = [...subSubCategories];

        if (editIndex !== null) {
            updated[editIndex] = formData;
        } else {
            updated.push({ ...formData });
        }

        setSubSubCategories(updated);
        saveToLocalStorage(updated);

        setFormData({ name: "", image: "" });
        setEditIndex(null);
        setShowForm(false);
    };

    // Helper to convert file to base64 string
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Handler for main image file input: set image into formData
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        }
    };

    // Delete Sub Category
    const handleDelete = (index) => {
        if (!window.confirm("Are you sure you want to delete this sub-category?"))
            return;

        const updated = subSubCategories.filter((_, i) => i !== index);

        setSubSubCategories(updated);
        saveToLocalStorage(updated);
    };

    // Edit Button
    const handleEdit = (item, index) => {
        setEditIndex(index);
        setFormData(item);
        setShowForm(true);
    };

    return (
        <div className="bg-white p-4 dark:bg-slate-900 min-h-screen">
            <div className="flex justify-between items-baseline">
                <button
                    onClick={() => navigate(`/categories/${id}`)}
                    className="text-xl font-semibold mb-4 inline-block text-blue-800 dark:text-orange-500"
                >
                    ← Back
                </button>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditIndex(null);
                        setFormData({ name: "", image: "" });
                    }}
                    className="mt-2 p-2 text-sm bg-green-700 text-white font-semibold w-20 rounded-md hover:bg-green-900"
                >
                    Add
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSave} className='border p-4 mb-6 rounded-md bg-yellow-100 w-full sm:w-96'>
                    <h2 className='text-lg font-semibold mb-2'>
                        {editIndex !== null ? "Edit Sub Category" : "Add Sub Category"}
                    </h2>

                    <input
                        type='text'
                        placeholder='Sub Category Name'
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
                        <img
                            src={formData.image}
                            alt="Uploaded Main"
                            className="my-2 max-h-20"
                        />
                    )}

                    <div className='flex gap-2'>
                        <button type='submit' className='bg-blue-700 text-white p-2 rounded-md hover:bg-blue-900'>
                            {editIndex !== null ? "Save Changes" : "Add Sub Category"}
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
                {subSubCategories.length === 0 ? (
                    <p className='dark:text-white'>No Sub Category Found</p>
                ) : (
                    subSubCategories.map((subCat, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(
                                `/categoryproduct/${subCat.name}/${id}/${subId}`
                            )}
                            className="bg-zinc-100 shadow-md rounded-md overflow-hidden cursor-pointer hover:bg-zinc-200 relative"
                        >
                            <img src={subCat.image} alt={subCat.name} className="w-full h-36 object-cover" />
                            <h1 className='text-xl text-blue-950 font-semibold m-2'>{subCat.name}</h1>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(subCat, index); }}
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

export default SubSubCategory;