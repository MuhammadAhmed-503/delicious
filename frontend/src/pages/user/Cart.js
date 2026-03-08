import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/apiService';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderType, setOrderType] = useState('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddressChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
        })),
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
        orderType,
        specialInstructions,
      };

      await orderService.createOrder(orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/user/order-history');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto fade-in">
            <FaShoppingCart className="text-6xl text-gray-300 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate('/user/order')}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition btn-hover"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 fade-in">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b pb-4 last:border-b-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="text-primary font-bold mt-1">Rs {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-lg font-bold"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">Rs {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-bold">Rs {(getCartTotal() * 0.1).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">
                    Rs {(getCartTotal() * 1.1).toLocaleString()}
                  </span>
                </div>
              </div>
              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition btn-hover"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Order Type</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>

                  {orderType === 'delivery' && (
                    <>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={deliveryAddress.street}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-gray-700 font-bold mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            value={deliveryAddress.city}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold mb-2">State</label>
                          <input
                            type="text"
                            name="state"
                            value={deliveryAddress.state}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-gray-700 font-bold mb-2">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={deliveryAddress.zipCode}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={deliveryAddress.phone}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Special Instructions</label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                      placeholder="Any special requests..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition btn-hover disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
