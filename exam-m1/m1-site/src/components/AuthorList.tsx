"use client"
import React, { useEffect, useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
import SearchBar from './SearchBar';
import SortBy from './SortBy';

function AuthorList() {
  const [authors, setauthors] = useState<AuthorModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<string>('title'); // Critère de tri, par défaut par titre

  useEffect(() => {
    // Appel à l'API pour obtenir la liste des livres
    fetch('http://localhost:3001/authors')
      .then(response => response.json())
      .then(data => setauthors(data))
      .catch(error => console.error('Erreur de récupération des livres:', error));
  }, []); // Laisser le tableau de dépendances vide pour que l'appel se fasse une seule fois

  

  return (
    <div>
      {/* Barre de recherche */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Intégrer le composant de tri */}
      <SortBy sortCriteria={sortCriteria} onSortChange={setSortCriteria} />

      <h1>Liste des livres</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.firstName} - {author.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorList;
