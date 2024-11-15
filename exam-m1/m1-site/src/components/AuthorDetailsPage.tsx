// src/components/AuthorDetailsPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
import { BookModel } from '../../../m1-api/src/modules/books/book.model';
import AuthorBooksList from './AuthorBooksList';
import EditAuthorForm from './EditAuthorForm';
import AddBookModal from './AddBookModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AuthorDetailsStyle from './AuthorDetailsStyle';


function AuthorDetailsPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<AuthorModel | null>(null);
  const [, setBooks] = useState<BookModel[]>([]);
  const [authorbooks, setAuthorBooks] = useState<BookModel[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewsData, setReviewsData] = useState<{ [bookId: string]: number }>({});

  const handleAddBook = (bookData: { title: string; yearPublished: number; authorId: string; price: number }) => {
    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book : bookData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, data]);
      })
      .catch((error) => console.error("Erreur lors de la création du livre:", error));
  };
  // Récupérer les détails de l'auteur et les livres associés
  useEffect(() => {
    fetch(`http://localhost:3001/authors/${id}`)
      .then((response) => response.json())
      .then((data) => setAuthor(data))
      .catch((error) => console.error('Erreur lors de la récupération des détails de l\'auteur:', error));
      fetch(`http://localhost:3001/authors/book/${id}`)
      .then((response) => response.json())
      .then((data) => { setAuthorBooks(data.books)})
      .catch((error) => console.error('Erreur lors de la récupération des détails de l\'auteur:', error));
  }, [id]);

  const fetchReviews = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${bookId}`);
      const data = await response.json();
      const reviews = data.reviews;
      const averageRating = reviews.length
        ? reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / reviews.length
        : 0;
      
      setReviewsData((prev) => ({ ...prev, [bookId]: averageRating }));
      
    } catch (error) {
      console.error(`Erreur de récupération des avis pour le livre ${bookId}:`, error);
    }
  };
useEffect(() => {
  // Appeler fetchReviews pour chaque livre
  authorbooks.forEach((book) => {
    fetchReviews(book.id);
  });
}, [authorbooks]);

  if (!author) return <p>Chargement...</p>;
  
  const averageRating = authorbooks.length
    ? authorbooks.reduce((sum, book) => sum + (reviewsData[book.id] || 0), 0) / authorbooks.length
    : 0;
  return (
    <AuthorDetailsStyle>
      
      <div className="flex flex-col items-center">
        {/* Affichage du nom de l'auteur et de l'image */}
        <h1 className="text-3xl font-bold text-center mb-4">{author.firstName} {author.lastName}</h1>
        {/* Affichage du nombre de livres et de la note moyenne */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            Nombre de livres: {authorbooks.length}
          </p>
          <p className="text-lg text-gray-700">
            Note moyenne: {averageRating}
          </p>
        </div>
        {/* Image de l'auteur */}
        <img
          //src={author.image_path || '/default-avatar.png'}
          alt={`${author.firstName} ${author.lastName}`}
          className="w-40 h-40 object-cover rounded-full mb-6 shadow-lg"
        />

        {/* Biographie de l'auteur */}
        <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl">
          {author.biography}
        </p>

        {/* Section actions (modifier, ajouter, supprimer) */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsEditMode(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Modifier l'auteur
          </button>
          <button
            onClick={() => setIsAddBookModalOpen(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Ajouter un livre
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
          >
            Supprimer l'auteur
          </button>
        </div>

        {/* Affichage des livres de l'auteur */}
        {authorbooks && authorbooks.length > 0 ? (
          <AuthorBooksList books={authorbooks} />
        ) : (
          <p className="text-gray-500">Aucun livre trouvé pour cet auteur.</p>
        )}

        {/* Formulaire de modification de l'auteur */}
        {isEditMode && (
          <EditAuthorForm author={author} onClose={() => setIsEditMode(false)} />
        )}

        {/* Modale pour ajouter un livre */}
       
{/*          
          {isAddBookModalOpen && (
          <AddBookModal
            authorId={author.id}
            isModalOpen={isAddBookModalOpen}
            setIsModalOpen={setIsAddBookModalOpen}
            onAddBook={ handleAddBook}
          />
          )} */}
        {isAddBookModalOpen && (
          <AddBookModal
            authorId={author.id}
            isModalOpen={isAddBookModalOpen}
            setIsModalOpen={setIsAddBookModalOpen}
            onAddBook={(bookData) => {
              handleAddBook(bookData);
              setIsAddBookModalOpen(false);
              // Refresh the author books list after adding a new book
              fetch(`http://localhost:3001/authors/book/${id}`)
                .then((response) => response.json())
                .then((data) => setAuthorBooks(data.books))
                .catch((error) => console.error('Erreur lors de la récupération des détails de l\'auteur:', error)); 
                authorbooks.forEach((book) => {
                  fetchReviews(book.id);
                });
            }}
            
            // Refresh the reviews after adding a new book
           
          />
        )}

        {/* Modale de confirmation de suppression */}
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            onConfirm={() => {
              fetch(`http://localhost:3001/authors/${id}`, { method: 'DELETE' })
                .then(() => {
                  alert('Auteur supprimé avec succès');
                  // Redirection ou autre traitement après suppression
                })
                .catch((error) => console.error('Erreur lors de la suppression de l\'auteur:', error));
            }}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </AuthorDetailsStyle>
  );
}

export default AuthorDetailsPage;
