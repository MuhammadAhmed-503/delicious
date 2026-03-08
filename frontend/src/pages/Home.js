import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuService, galleryService } from '../services/apiService';
import FoodCard from '../components/FoodCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaUtensils, FaClock, FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchFeaturedFoods();
    fetchGalleryImages();
  }, []);

  const fetchFeaturedFoods = async () => {
    try {
      const response = await menuService.getAllItems({ availability: true });
      setFeaturedFoods(response.data.foodItems.slice(0, 6));
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await galleryService.getAllImages();
      setGalleryImages(response.data.images.slice(0, 6));
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80)',
          }}
        ></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-accent">Delicious</span>
            </h1>
            <p className="text-xl mb-8">
              Experience the finest dining with our exquisite menu and exceptional service. 
              We're open 24 hours a day, 7 days a week!
            </p>
            <div className="flex gap-4">
              <Link
                to={isAuthenticated ? "/user/reservation" : "/login"}
                className="bg-accent text-primary px-8 py-3 rounded-lg text-lg font-bold hover:bg-accent-light transition btn-hover"
              >
                Book a Table
              </Link>
              <Link
                to="/menu"
                className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition btn-hover"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Quality Food</h3>
              <p className="text-gray-600">Fresh ingredients and authentic recipes</p>
            </div>
            <div className="text-center p-6 fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7 Service</h3>
              <p className="text-gray-600">Open 24 hours for your convenience</p>
            </div>
            <div className="text-center p-6 fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Featured <span className="text-primary">Dishes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                onAddToCart={addToCart}
                showAddButton={isAuthenticated}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-primary-dark transition btn-hover"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                About <span className="text-primary">Delicious</span>
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                Welcome to Delicious, where culinary excellence meets exceptional service. 
                Since our establishment, we've been dedicated to providing our guests with 
                unforgettable dining experiences.
              </p>
              <p className="text-gray-600 mb-6 text-lg">
                Our chefs use only the finest ingredients to create dishes that delight 
                the senses. Whether you're here for a quick bite or a special celebration, 
                we're open 24 hours to serve you.
              </p>
              <Link
                to="/about"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition btn-hover"
              >
                Learn More
              </Link>
            </div>
            <div className="fade-in">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                alt="Restaurant"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {galleryImages.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Our <span className="text-primary">Gallery</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image._id} className="overflow-hidden rounded-lg shadow-lg fade-in">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/gallery"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-primary-dark transition btn-hover"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg fade-in">
              <div className="text-accent mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "Amazing food and excellent service! The atmosphere is perfect for any occasion."
              </p>
              <p className="font-bold text-gray-800">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg fade-in">
              <div className="text-accent mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "Best restaurant in town! The 24-hour service is incredibly convenient."
              </p>
              <p className="font-bold text-gray-800">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg fade-in">
              <div className="text-accent mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "Delicious food, great prices, and friendly staff. Highly recommended!"
              </p>
              <p className="font-bold text-gray-800">- Mike Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Visit <span className="text-primary">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fade-in">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Location & Hours</h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <span>123 Restaurant Street, Food City, FC 12345</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-primary" />
                  <span>+1 (555) 123-4567</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  <span>info@delicious.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">⏰</span>
                  <span className="font-bold text-accent">Open 24 Hours - Every Day!</span>
                </p>
              </div>
            </div>
            <div className="fade-in">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <iframe
                  title="Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841394937537!2d-73.98784368459407!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
