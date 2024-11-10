'use client';
import './App.css';

// HomePage.js
import React, { useEffect, useState } from 'react';
import {BookRepository} from '../../../m1-api/src/modules/books/book.repository';
import GlobalLayout from '../../../m1-site/src/components/GlobalLayout';




function HomePage() {
  const [books, getBooks] = useState([]);

  useEffect(() => {
    // Appel à l'API pour obtenir la liste des livres depuis NestJS
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => getBooks(data));
  }, []);

  return (
    <GlobalLayout>
    <div>
      <h1>Bienvenue à la Bibliothèque</h1>
     
      {/* <BookRepository books={books} /> */}
    </div>
    </GlobalLayout>
  );
}

export default HomePage;


