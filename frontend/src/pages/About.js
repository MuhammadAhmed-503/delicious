import React from 'react';
import { FaBullseye, FaEye, FaStar, FaHeart, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-gray-600">
            Learn more about our story and passion for great food
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Welcome to Delicious, where culinary passion meets exceptional service. 
              Founded with a vision to bring authentic and delicious food to our community, 
              we have been serving memorable dining experiences for years.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our journey began with a simple belief: that great food has the power to bring 
              people together. From our humble beginnings to becoming a beloved local establishment, 
              we've remained committed to quality, authenticity, and customer satisfaction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to offer our services 24 hours a day, 7 days a week, ensuring 
              that whenever you crave delicious food, we're here to serve you. Whether it's a 
              late-night snack or an early morning breakfast, our doors are always open.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 fade-in">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <FaBullseye className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide our customers with exceptional dining experiences through delicious food, 
              outstanding service, and a welcoming atmosphere. We strive to use the freshest 
              ingredients and authentic recipes to create dishes that delight and satisfy.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 fade-in">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <FaEye className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most loved restaurant in our community by consistently exceeding 
              expectations and creating lasting memories for every guest. We envision a place 
              where quality food and genuine hospitality create unforgettable experiences.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16 fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our ingredients and preparation
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Passion</h3>
              <p className="text-gray-600">
                Every dish is prepared with love and dedication to our craft
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Service</h3>
              <p className="text-gray-600">
                Customer satisfaction is at the heart of everything we do
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Chefs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Behind every great dish is a team of passionate professionals dedicated to 
            excellence. Our chefs bring years of experience and creativity to every plate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                name: 'Chef Antonio Martinez', 
                role: 'Executive Head Chef', 
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop'
              },
              { 
                name: 'Chef Maria Rodriguez', 
                role: 'Pastry Chef', 
                image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop'
              },
              { 
                name: 'Chef David Chen', 
                role: 'Sous Chef', 
                image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop'
              },
              { 
                name: 'Chef Sarah Williams', 
                role: 'Grill Master', 
                image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop'
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
