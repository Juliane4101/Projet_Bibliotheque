"use client"
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../../m1-api/src/modules/books/book.model';
import BookModal from './BookModal';
import SearchBar from './SearchBar';
import SortBy from './SortBy';

function BookList() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<string>('title');
  const [reviewsData, setReviewsData] = useState<{ [bookId: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer la liste des livres
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Erreur de récupération des livres:', error));
  }, []);

  const fetchReviews = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${bookId}`);
      const data = await response.json();
      const reviews = data.reviews;
      const averageRating = reviews.length
        ? reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / reviews.length
        : 0;
      setReviewsData(prev => ({ ...prev, [bookId]: averageRating }));
    } catch (error) {
      console.error(`Erreur de récupération des avis pour le livre ${bookId}:`, error);
    }
  };

  useEffect(() => {
    // Appeler fetchReviews pour chaque livre
    books.forEach(book => {
      fetchReviews(book.id);
    });
  }, [books]);

  const handleAddBook = (bookData: { title: string; yearPublished: number; authorId: string }) => {
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book: bookData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, data]);
      })
      .catch((error) => console.error('Erreur lors de la création du livre:', error));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === 'yearPublished') {
      return a.yearPublished - b.yearPublished;
    }
    return 0;
  });

  return (
    <div>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SortBy sortCriteria={sortCriteria} onSortChange={setSortCriteria} />
      <h1>Liste des livres</h1>

      <button onClick={() => setIsModalOpen(true)}>Ajouter un livre</button>

      <ul>
        {sortedBooks.map((book) => {
          const averageRating = reviewsData[book.id] || 0;

          return (
            <li key={book.id}>
              <h3>{book.title} - {book.author.firstName} {book.author.lastName} ({book.yearPublished})</h3>
              <div>
                <strong>Note moyenne : </strong>
                {averageRating.toFixed(1)} / 5
              </div>
            </li>
          );
        })}
      </ul>

      {isModalOpen && (
        <BookModal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          onAddBook={handleAddBook} 
        />
      )}
    </div>
  );
}

export default BookList;
