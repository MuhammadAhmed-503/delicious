import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaUtensils, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaUtensils className="text-accent" />
            <span>Delicious</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/menu" className="hover:text-accent transition">Menu</Link>
            <Link to="/gallery" className="hover:text-accent transition">Gallery</Link>
            <Link to="/about" className="hover:text-accent transition">About</Link>
            <Link to="/contact" className="hover:text-accent transition">Contact</Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="hover:text-accent transition">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/user" className="hover:text-accent transition">Dashboard</Link>
                    <Link to="/user/cart" className="relative hover:text-accent transition">
                      <FaShoppingCart className="text-xl" />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {getCartCount()}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent-light transition btn-hover"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent transition">Login</Link>
                <Link
                  to="/signup"
                  className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent-light transition btn-hover"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/menu" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Menu</Link>
              <Link to="/gallery" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Gallery</Link>
              <Link to="/about" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/contact" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Contact</Link>

              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  ) : (
                    <>
                      <Link to="/user" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Dashboard</Link>
                      <Link to="/user/cart" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>
                        Cart ({getCartCount()})
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent-light transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-accent transition" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link
                    to="/signup"
                    className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent-light transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
