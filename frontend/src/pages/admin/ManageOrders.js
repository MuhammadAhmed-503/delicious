import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaShoppingBag, FaUser, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { orderStatus: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-blue-100 text-blue-800';
      case 'Preparing':
        return 'bg-purple-100 text-purple-800';
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
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaShoppingBag className="text-primary" /> Manage Orders
        </h1>
        <p className="text-gray-500 mt-1">{orders.length} total orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <FaUser className="text-xs" /> {order.userId?.name} ({order.userId?.email})
                </p>
                <p className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">Rs {order.totalPrice.toLocaleString()}</p>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Order Items:</h4>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-600">
                    <span>{item.quantity}x {item.name}</span>
                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="border-t pt-4 mb-4">
                <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-primary" /> Delivery Address:
                </h4>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                  {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
                <p className="text-sm text-gray-600">Phone: {order.deliveryAddress.phone}</p>
              </div>
            )}

            {order.specialInstructions && (
              <div className="border-t pt-4 mb-4">
                <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <FaStickyNote className="text-yellow-500" /> Special Instructions:
                </h4>
                <p className="text-sm text-gray-600">{order.specialInstructions}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Update Status:</label>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Preparing">Preparing</option>
                <option value="Completed">Completed</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FaShoppingBag className="text-5xl mx-auto mb-3 opacity-30" />
          <p className="text-xl">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
