import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// User Dashboard
import UserDashboard from './pages/user/UserDashboard';
import Profile from './pages/user/Profile';
import Reservation from './pages/user/Reservation';
import OrderFood from './pages/user/OrderFood';
import Cart from './pages/user/Cart';
import OrderHistory from './pages/user/OrderHistory';
import ReservationHistory from './pages/user/ReservationHistory';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageMenu from './pages/admin/ManageMenu';
import ManageOrders from './pages/admin/ManageOrders';
import ManageReservations from './pages/admin/ManageReservations';
import ManageGallery from './pages/admin/ManageGallery';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? '' : 'flex flex-col min-h-screen'}>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? '' : 'flex-grow'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Protected Routes */}
          <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/reservation" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
          <Route path="/user/order" element={<ProtectedRoute><OrderFood /></ProtectedRoute>} />
          <Route path="/user/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/user/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          <Route path="/user/reservation-history" element={<ProtectedRoute><ReservationHistory /></ProtectedRoute>} />

          {/* Admin Protected Routes - Nested with AdminLayout */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="menu" element={<ManageMenu />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="reservations" element={<ManageReservations />} />
            <Route path="gallery" element={<ManageGallery />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
