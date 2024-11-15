'use client';

import React from 'react';

interface HomeStyleProps {
  children: React.ReactNode; 
}

const HomeStyle: React.FC<HomeStyleProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 pt-16 pb-12">
      <div className="max-w-4xl text-center bg-white p-10 rounded-lg shadow-lg border border-blue-200 mx-auto">
        {children} 
      </div>
    </div>
  );
};

export default HomeStyle;
