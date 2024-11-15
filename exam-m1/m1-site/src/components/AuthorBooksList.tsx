import React, { useState } from 'react';

import { BookModel } from '../../../m1-api/src/modules/books/book.model';
import DeleteBookModal from '../modales/DeleteBookModal';
interface AuthorBooksListProps {
  books: BookModel[];
}

const AuthorBooksList: React.FC<AuthorBooksListProps> = ({ books }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2>Livres de l'auteur</h2>
      <ul>
        
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <a href={`http://localhost:3000/books/${book.id}`}> {book.title} </a>
              <button onClick={() => setIsModalOpen(true)}>
                <span role="img" aria-label="delete">❌</span>
              </button>
              {isModalOpen && (
                <DeleteBookModal
                  book={book}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
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
