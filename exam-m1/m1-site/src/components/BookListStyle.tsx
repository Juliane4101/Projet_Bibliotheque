// src/components/BookListStyle.tsx
'use client';

import React from 'react';

interface BookListStyleProps {
  children: React.ReactNode; // Le contenu à afficher, comme la liste des livres
}

const BookListStyle: React.FC<BookListStyleProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {children} {/* Affiche les enfants passés, c'est-à-dire la liste des livres */}
    </div>
  );
};

export default BookListStyle;
