import React, { useEffect, useState } from 'react';
import { menuService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaUtensils } from 'react-icons/fa';

const ManageMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    imageUrl: '',
    availability: true,
  });

  const categories = ['Pizza', 'Burgers', 'BBQ', 'Fast Food', 'Drinks', 'Desserts'];

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await menuService.getAllItems();
      setFoods(response.data.foodItems);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      submitData.append('availability', formData.availability);
      
      // If a new file is selected, append it
      if (selectedFile) {
        submitData.append('image', selectedFile);
      } else if (formData.imageUrl) {
        // If no file selected but there's a URL (for editing without changing image)
        submitData.append('imageUrl', formData.imageUrl);
      }

      if (editingFood) {
        await menuService.updateItem(editingFood._id, submitData);
        toast.success('Food item updated successfully');
      } else {
        await menuService.createItem(submitData);
        toast.success('Food item created successfully');
      }
      setShowModal(false);
      setEditingFood(null);
      setSelectedFile(null);
      setImagePreview('');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Pizza',
        imageUrl: '',
        availability: true,
      });
      fetchFoods();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save food item');
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      imageUrl: food.image,
      availability: food.availability,
    });
    setImagePreview(food.image);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await menuService.deleteItem(id);
      toast.success('Food item deleted successfully');
      fetchFoods();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete food item');
    }
  };

  const handleAdd = () => {
    setEditingFood(null);
    setSelectedFile(null);
    setImagePreview('');
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Pizza',
      imageUrl: '',
      availability: true,
    });
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUtensils className="text-primary" /> Manage Menu
          </h1>
          <p className="text-gray-500 mt-1">{foods.length} items in menu</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          <FaPlus /> Add New Item
        </button>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div key={food._id} className="bg-white rounded-lg shadow-lg overflow-hidden fade-in">
              <div className="relative h-48">
                <img
                  src={food.image || 'https://via.placeholder.com/400x300'}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                {!food.availability && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Unavailable
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{food.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{food.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-bold">Category:</span> {food.category}
                </p>
                <p className="text-xl font-bold text-primary mb-4">Rs {food.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(food)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingFood ? 'Edit Food Item' : 'Add New Food Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Food Image {editingFood && '(Leave empty to keep current image)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Accepted formats: JPG, PNG, GIF, WebP (Max: 5MB)
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 font-bold">Available</label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
                  >
                    {editingFood ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default ManageMenu;
