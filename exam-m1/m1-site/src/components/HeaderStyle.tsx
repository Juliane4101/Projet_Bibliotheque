'use client';

import React from 'react';
import './GlobalLayout.css';

interface HeaderStyleProps {
  children: React.ReactNode; 
}

const HeaderStyle: React.FC<HeaderStyleProps> = ({ children }) => {
  const headerClasses = "bg-gray-800 text-white p-4"; 
  const titleClasses = "text-2xl font-bold text-center mb-2"; 
  const buttonGroupClasses = "flex space-x-4 justify-center";

  return (
    <header className={headerClasses}>
      <h1 className={titleClasses}>Ma Bibliothèque</h1>
      <div className={buttonGroupClasses}>
        {children}
      </div>
    </header>
  );
};

export default HeaderStyle;
