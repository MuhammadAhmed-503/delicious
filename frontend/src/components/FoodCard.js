import React from 'react';

const FoodCard = ({ food, onAddToCart, showAddButton = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image || 'https://via.placeholder.com/400x300?text=Food+Image'}
          alt={food.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        {!food.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Unavailable</span>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
          {food.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{food.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{food.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">Rs {food.price.toLocaleString()}</span>
          {showAddButton && food.availability && (
            <button
              onClick={() => onAddToCart(food)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition btn-hover"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
