"use client"
import React, { useEffect, useState } from 'react';
import {BookModel} from '../../../m1-api/src/modules/books/book.model';
import SearchBar from './SearchBar';

function BookList() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Appel à l'API pour obtenir la liste des livres
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Erreur de récupération des livres:', error));
  }, []); // Laisser le tableau de dépendances vide pour que l'appel se fasse une seule fois

  return (
    <div>
        {/* Barre de recherche */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <h1>Liste des livres</h1>
      <ul>
        {books.map(BookModel => (
          <li key={BookModel.id}>
            {BookModel.title} - {BookModel.author.firstName} {BookModel.author.lastName} ({BookModel.yearPublished})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
