import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  FaUsers, FaShoppingBag, FaCalendarAlt, FaMoneyBillWave,
  FaUtensils, FaImages, FaClock, FaCheckCircle, FaTimesCircle, FaChartBar,
} from 'react-icons/fa';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
    <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <Icon className="text-white text-2xl" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminService.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Users" value={stats?.totalUsers} icon={FaUsers} color="bg-blue-500" />
        <StatCard label="Total Orders" value={stats?.totalOrders} icon={FaShoppingBag} color="bg-primary" />
        <StatCard label="Reservations" value={stats?.totalReservations} icon={FaCalendarAlt} color="bg-purple-500" />
        <StatCard label="Total Revenue" value={`Rs ${(stats?.totalRevenue ?? 0).toLocaleString()}`} icon={FaMoneyBillWave} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
            <FaClock className="text-white text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-yellow-600">{stats?.pendingOrders ?? 0}</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <FaCheckCircle className="text-white text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed Orders</p>
            <p className="text-2xl font-bold text-green-600">{stats?.completedOrders ?? 0}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <FaTimesCircle className="text-white text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Cancelled Orders</p>
            <p className="text-2xl font-bold text-primary">{stats?.cancelledOrders ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartBar className="text-primary" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { to: '/admin/menu', icon: FaUtensils, label: 'Menu', color: 'bg-orange-500' },
            { to: '/admin/orders', icon: FaShoppingBag, label: 'Orders', color: 'bg-primary' },
            { to: '/admin/reservations', icon: FaCalendarAlt, label: 'Reservations', color: 'bg-purple-500' },
            { to: '/admin/gallery', icon: FaImages, label: 'Gallery', color: 'bg-primary' },
            { to: '/admin/users', icon: FaUsers, label: 'Users', color: 'bg-blue-500' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all text-center group">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white text-xl" />
              </div>
              <p className="text-sm font-semibold text-gray-700">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaShoppingBag className="text-primary" /> Recent Orders
            </h2>
            <Link to="/admin/orders" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          {stats?.recentOrders?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="flex justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{order.userId?.name}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-sm">Rs {order.totalPrice.toLocaleString()}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{order.orderStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FaShoppingBag className="text-4xl mx-auto mb-2 opacity-30" />
              <p>No recent orders</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" /> Recent Reservations
            </h2>
            <Link to="/admin/reservations" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          {stats?.recentReservations?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentReservations.map((r) => (
                <div key={r._id} className="flex justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-500">Table #{r.tableNumber} · {r.guests} guests</p>
                    <p className="text-xs text-gray-500">{new Date(r.reservationDate).toLocaleDateString()} at {r.reservationTime}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{r.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FaCalendarAlt className="text-4xl mx-auto mb-2 opacity-30" />
              <p>No recent reservations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
