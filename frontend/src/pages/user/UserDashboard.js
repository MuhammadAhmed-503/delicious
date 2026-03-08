import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaShoppingBag, FaCalendarAlt, FaStar, FaUser, FaUtensils, FaHistory } from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    orders: [],
    reservations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [ordersRes, reservationsRes] = await Promise.all([
        userService.getOrders(),
        userService.getReservations(),
      ]);
      setStats({
        orders: ordersRes.data.orders,
        reservations: reservationsRes.data.reservations,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-primary">{user?.name}!</span>
          </h1>
          <p className="text-gray-600">Manage your orders and reservations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-primary">{stats.orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <FaShoppingBag className="text-white text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Reservations</p>
                <p className="text-3xl font-bold text-primary">{stats.reservations.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Member Since</p>
                <p className="text-lg font-bold text-primary">{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                <FaStar className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/user/profile" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition fade-in text-center">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">My Profile</h3>
            <p className="text-gray-600">View and edit your profile</p>
          </Link>
          <Link to="/user/order" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition fade-in text-center">
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Order Food</h3>
            <p className="text-gray-600">Browse menu and order</p>
          </Link>
          <Link to="/user/reservation" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition fade-in text-center">
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Book Table</h3>
            <p className="text-gray-600">Reserve a table</p>
          </Link>
          <Link to="/user/order-history" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition fade-in text-center">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaHistory className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Order History</h3>
            <p className="text-gray-600">View past orders</p>
          </Link>
        </div>

        {/* Recent Orders */}
        {stats.orders.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {stats.orders.slice(0, 3).map((order) => (
                <div key={order._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">Rs {order.totalPrice.toLocaleString()}</p>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          order.orderStatus === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
