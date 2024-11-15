'use client';

import React from 'react';

interface AuthorDetailsStyleProps {
  children: React.ReactNode;
}

const AuthorDetailsStyle: React.FC<AuthorDetailsStyleProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export default AuthorDetailsStyle;
