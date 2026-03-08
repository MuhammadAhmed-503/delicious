import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart, FaUtensils } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2"><FaUtensils /> Delicious Restaurant</h3>
            <p className="text-gray-400">
              Experience the finest dining with our exquisite menu and exceptional service. We're open 24 hours to serve you!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-accent transition">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-accent transition">Menu</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-accent transition">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-accent transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Opening Hours</h3>
            <div className="text-gray-400 space-y-2">
              <p className="flex items-center gap-2">
                <FaClock className="text-accent" />
                <span className="font-bold">Open 24 Hours!</span>
              </p>
              <p>Monday - Sunday</p>
              <p>All Day, Every Day</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-accent" />
                <span>123 Restaurant Street, Food City, FC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-accent" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-accent" />
                <span>info@delicious.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Delicious Restaurant. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">Made with <FaHeart className="text-primary" /> for food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
