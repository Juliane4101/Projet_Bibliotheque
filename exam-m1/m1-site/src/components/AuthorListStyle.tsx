'use client';

import React from 'react';

interface AuthorListStyleProps {
  children: React.ReactNode; 
}

const AuthorListStyle: React.FC<AuthorListStyleProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {children} 
    </div>
  );
};

export default AuthorListStyle;
