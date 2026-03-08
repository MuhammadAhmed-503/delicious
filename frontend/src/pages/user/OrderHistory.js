import React, { useEffect, useState } from 'react';
import { userService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaBox } from 'react-icons/fa';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await userService.getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
      case 'Accepted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 fade-in">Order History</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center fade-in">
            <FaBox className="text-6xl text-gray-300 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-gray-600">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 fade-in">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                    <p className="text-xl font-bold text-primary mt-2">
                      Rs {order.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-800 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div className="border-t mt-4 pt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Delivery Address:</h4>
                    <p className="text-gray-600">
                      {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                      {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                    </p>
                  </div>
                )}

                {order.specialInstructions && (
                  <div className="border-t mt-4 pt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Special Instructions:</h4>
                    <p className="text-gray-600">{order.specialInstructions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
