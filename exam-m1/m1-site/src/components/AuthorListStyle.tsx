// src/components/AuthorListStyle.tsx
'use client';

import React from 'react';

interface AuthorListStyleProps {
  children: React.ReactNode; // Le contenu à afficher, comme la liste des auteurs
}

const AuthorListStyle: React.FC<AuthorListStyleProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      {children} {/* Affiche les enfants passés, c'est-à-dire la liste des auteurs */}
    </div>
  );
};

export default AuthorListStyle;
