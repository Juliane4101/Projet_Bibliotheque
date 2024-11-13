// src/components/BreadcrumbsStyle.tsx
'use client';

import React from 'react';

interface BreadcrumbsStyleProps {
  children: React.ReactNode;
}

const BreadcrumbsStyle: React.FC<BreadcrumbsStyleProps> = ({ children }) => {
  // Classes Tailwind pour le nouveau style de fond et de texte
  const containerClasses = "bg-blue-100 text-blue-700 p-4 rounded-md shadow-md"; // Fond bleu clair avec texte bleu foncé
  const listClasses = "flex space-x-2 list-none p-0"; // Liste horizontale
  const itemClasses = "text-blue-700 hover:text-blue-900 font-medium"; // Texte bleu foncé, avec surbrillance au survol

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

