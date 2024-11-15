// src/components/BookListStyle.tsx
'use client';

import React from 'react';

interface BookListStyleProps {
  children: React.ReactNode;
}

const BookListStyle: React.FC<BookListStyleProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {children} 
    </div>
  );
};

export default BookListStyle;
