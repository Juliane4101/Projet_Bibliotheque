// App.tsx ou Routes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import des composants de page
import BookList from './components/BookList';
import AuthorDetailsPage from './components/AuthorDetailsPage';
//import BookDetailsPage from './components/BookDetailsPage';
import HomePage from './app/HomePage';


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour la liste des livres */}
        <Route path="/books" element={<BookList />} />

        {/* Route pour les détails d'un livre avec ID dynamique */}
        {/* <Route path="/books/:id" element={<BookDetailsPage />} /> */}

        {/* Route pour les détails d'un auteur avec ID dynamique */}
        <Route path="/authors/:id" element={<AuthorDetailsPage />} />

        
        
      </Routes>
    </Router>
  );
}

export default AppRouter;
