import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FaUtensils className="text-2xl text-primary" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
