import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaUtensils,
  FaShoppingBag,
  FaCalendarAlt,
  FaImages,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaHome,
} from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: FaTachometerAlt, exact: true },
  { path: '/admin/menu', label: 'Manage Menu', icon: FaUtensils },
  { path: '/admin/orders', label: 'Manage Orders', icon: FaShoppingBag },
  { path: '/admin/reservations', label: 'Manage Reservations', icon: FaCalendarAlt },
  { path: '/admin/gallery', label: 'Manage Gallery', icon: FaImages },
  { path: '/admin/users', label: 'Manage Users', icon: FaUsers },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 bg-primary border-b border-primary-dark">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <FaUtensils className="text-accent text-xl" />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>
          <button
            className="lg:hidden text-white hover:text-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate max-w-[140px]">{user?.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">Main Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${active
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    <Icon className={`text-lg flex-shrink-0 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {active && <FaChevronRight className="ml-auto text-xs" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">Other</p>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 group"
            >
              <FaHome className="text-lg text-gray-500 group-hover:text-white" />
              <span className="font-medium text-sm">View Website</span>
            </Link>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-900 hover:text-red-300 transition-all duration-200 group"
          >
            <FaSignOutAlt className="text-lg text-gray-500 group-hover:text-red-300" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <button
            className="lg:hidden text-gray-600 hover:text-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={22} />
          </button>

          {/* Page title from location */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span>Admin</span>
            <FaChevronRight className="text-xs" />
            <span className="text-gray-800 font-medium">
              {navItems.find((i) => isActive(i))?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, <span className="font-semibold text-gray-800">{user?.name}</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
