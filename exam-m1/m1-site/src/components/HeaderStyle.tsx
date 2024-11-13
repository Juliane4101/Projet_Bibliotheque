// src/components/HeaderStyle.tsx
'use client';

import React from 'react';

interface HeaderStyleProps {
  children: React.ReactNode; // Pour inclure les boutons ou autres éléments dans le header
}

const HeaderStyle: React.FC<HeaderStyleProps> = ({ children }) => {
  // Classes Tailwind pour le header et le titre
  const headerClasses = "bg-gray-800 text-white p-4"; // Style par défaut pour le header
  const titleClasses = "text-2xl font-bold text-center mb-2"; // Style pour le titre
  const buttonGroupClasses = "flex space-x-4 justify-center";

  return (
    <header className={headerClasses}>
      {/* Titre fixe "Ma Bibliothèque" */}
      <h1 className={titleClasses}>Ma Bibliothèque</h1>
      <div className={buttonGroupClasses}>
        {children} {/* Affiche les enfants passés au composant, ici les boutons */}
      </div>
    </header>
  );
};

export default HeaderStyle;
