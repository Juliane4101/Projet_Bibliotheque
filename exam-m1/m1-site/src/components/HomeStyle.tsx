// src/components/HomeStyle.tsx
'use client';

import React from 'react';

interface HomeStyleProps {
  children: React.ReactNode; // Le contenu à afficher, comme la page d'accueil
}

const HomeStyle: React.FC<HomeStyleProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 pt-16 pb-12">
      <div className="max-w-4xl text-center bg-white p-10 rounded-lg shadow-lg border border-blue-200 mt-8">
        {children} {/* Affiche les enfants passés, c'est-à-dire la page d'accueil */}
      </div>
    </div>
  );
};

export default HomeStyle;
