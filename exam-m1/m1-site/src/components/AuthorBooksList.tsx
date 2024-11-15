import React from 'react';

import { BookModel } from '../../../m1-api/src/modules/books/book.model';

interface AuthorBooksListProps {
  books: BookModel[];
}

const AuthorBooksList: React.FC<AuthorBooksListProps> = ({ books }) => {
  return (
    <div>
      <h2>Livres de l'auteur</h2>
      <ul>
        
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
            <a href={`http://localhost:3000/books/${book.id}`}> {book.title} </a>
            </li>
          ))
        ) : (
          <p>Aucun livre trouvé</p>
        )}
      </ul>
    </div>
  );
};

export default AuthorBooksList;
