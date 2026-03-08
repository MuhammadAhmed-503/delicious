import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService } from '../../services/apiService';
import FoodCard from '../../components/FoodCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const OrderFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, getCartCount } = useCart();

  const categories = ['All', 'Pizza', 'Burgers', 'BBQ', 'Fast Food', 'Drinks', 'Desserts'];

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = selectedCategory !== 'All' ? { category: selectedCategory, availability: true } : { availability: true };
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
        <div className="flex justify-between items-center mb-8 fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Food</h1>
            <p className="text-gray-600">Browse our menu and add items to your cart</p>
          </div>
          <Link
            to="/user/cart"
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition btn-hover flex items-center gap-2"
          >
            <FaShoppingCart /> Cart ({getCartCount()})
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
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
              <FoodCard key={food._id} food={food} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items available in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFood;
