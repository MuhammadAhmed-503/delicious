import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {user?.name}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {user?.phone}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Account Type</label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-800 capitalize">
                {user?.role}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Member Since</label>
              <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {new Date(user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-gray-600 text-sm">
              Need to update your information? Please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
