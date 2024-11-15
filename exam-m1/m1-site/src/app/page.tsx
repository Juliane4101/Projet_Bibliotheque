// src/pages/HomePage.tsx
'use client';

import React from 'react';
import HomeStyle from '../components/HomeStyle'; // Import du composant HomeStyle
import Link from 'next/link'; // Pour le lien vers la collection de livres
import GlobalLayout from '../components/GlobalLayout'; // Import de GlobalLayout

const HomePage = () => {
  return (
    <GlobalLayout>  {/* Utilisation du GlobalLayout pour structurer la page */}
      <HomeStyle>  {/* Utilisation du composant HomeStyle pour appliquer le style */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Bienvenue dans votre Bibliothèque
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Redécouvrez votre collection de livres en un clic !
        </p>
        <div className="mt-8">
          <Link href="/books">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg">
              Explorer ma collection
            </button>
          </Link>
        </div>
      </HomeStyle>
    </GlobalLayout>
  );
};

export default HomePage;




