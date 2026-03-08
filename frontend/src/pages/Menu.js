import React, { useEffect, useState } from 'react';
import { menuService } from '../services/apiService';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Pizza', 'Burgers', 'BBQ', 'Fast Food', 'Drinks', 'Desserts'];

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = selectedCategory !== 'All' ? { category: selectedCategory } : {};
      const response = await menuService.getAllItems(params);
      setFoods(response.data.foodItems);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="text-xl text-gray-600">
            Explore our delicious selection of dishes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-bold transition btn-hover ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {loading ? (
          <LoadingSpinner />
        ) : foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                onAddToCart={addToCart}
                showAddButton={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
