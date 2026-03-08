import React, { useEffect, useState } from 'react';
import { galleryService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaImages, FaUpload, FaTrash } from 'react-icons/fa';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    category: 'Food',
  });

  const categories = ['Food', 'Interior', 'Events'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await galleryService.getAllImages();
      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      submitData.append('title', formData.title);
      submitData.append('category', formData.category);
      
      // Append the image file
      if (selectedFile) {
        submitData.append('image', selectedFile);
      } else if (formData.imageUrl) {
        submitData.append('imageUrl', formData.imageUrl);
      }

      await galleryService.uploadImage(submitData);
      toast.success('Image uploaded successfully');
      setShowModal(false);
      setSelectedFile(null);
      setImagePreview('');
      setFormData({
        imageUrl: '',
        title: '',
        category: 'Food',
      });
      fetchImages();
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryService.deleteImage(id);
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaImages className="text-pink-500" /> Manage Gallery
          </h1>
          <p className="text-gray-500 mt-1">{images.length} images uploaded</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          <FaUpload /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="relative h-56">
              <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span className="bg-black bg-opacity-60 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  {image.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{image.title}</h3>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(image.uploadedAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(image._id)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FaImages className="text-5xl mx-auto mb-3 opacity-30" />
          <p className="text-xl">No images in gallery</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaUpload className="text-pink-500" /> Upload New Image
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gallery Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP (Max: 5MB)</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Image title"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-lg hover:bg-primary-dark transition font-semibold">
                  Upload
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold">
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

export default ManageGallery;
