import React from 'react';
import './Header.css'; // Optionnel, pour le style

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Ma Bibliothèque</h1>
      <nav>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/books">Livres</a></li>
          <li><a href="/authors">Auteur</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
