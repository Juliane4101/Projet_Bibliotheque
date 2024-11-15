'use client';

import React from 'react';
import './GlobalLayout.css';

interface BreadcrumbsStyleProps {
  children: React.ReactNode;
}

const BreadcrumbsStyle: React.FC<BreadcrumbsStyleProps> = ({ children }) => {
  // Classes Tailwind 
  const containerClasses = "bg-blue-100 text-blue-700 p-4 rounded-md shadow-md"; 
  const listClasses = "flex space-x-2 list-none p-0"; 
  const itemClasses = "text-blue-700 hover:text-blue-900 font-medium"; 

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        {React.Children.map(children, (child) => (
          <li className={itemClasses}>{child}</li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbsStyle;

