// src/components/BookDetailsPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Modal, Drawer, List, ListItem, Box, Rating } from '@mui/material';
import { Book, Delete } from '@mui/icons-material';
import { ReviewModel } from '../../../m1-api/src/modules/reviews/review.model';
import { BookModel } from '../../../m1-api/src/modules/books/book.model';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookModel | null>(null);
  const [reviews, setReviews] = useState<ReviewModel[] | null>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error('Erreur lors de la récupération des livres de l\'auteur:', error));

    fetch(`http://localhost:3001/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews))
      .catch((error) => console.error('Erreur lors de la récupération des avis:', error));

    setLoading(false);
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setDeleteModalOpen(false);
        // Redirection après la suppression si nécessaire
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    if (reviews) {
      setReviews([...reviews].reverse());
    }
  };

  return (
    <Box className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : (
        book && (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{book.title}</h1>

            <div className="text-gray-700 text-center mb-4">
              <p><strong>Année de publication:</strong> {book.yearPublished}</p>
              <p>
                <strong>Auteur:</strong>{" "}
                <a
                  href={`http://localhost:3000/authors/${book.author.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {book.author.firstName} {book.author.lastName}
                </a>
              </p>
              <p><strong>Prix:</strong> {book.price}€</p>
            </div>

            <div className="flex space-x-4 mt-4">
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={() => setDeleteModalOpen(true)}
                className="bg-red-500 text-white hover:bg-red-600 transition"
              >
                Supprimer
              </Button>

              <Button
                variant="contained"
                onClick={() => setDrawerOpen(true)}
                startIcon={<Book />}
                className="bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Voir les avis
              </Button>
            </div>

            <Modal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <Box className="p-6 bg-white rounded-lg shadow-lg mx-auto mt-40 max-w-sm text-center">
                <h3 className="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce livre ?</h3>
                <Button onClick={handleDelete} variant="contained" color="error" className="bg-red-500 text-white hover:bg-red-600 mr-2">Confirmer</Button>
                <Button onClick={() => setDeleteModalOpen(false)} variant="outlined" className="border-gray-300">Annuler</Button>
              </Box>
            </Modal>

            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box className="w-80 p-4">
                <h2 className="text-xl font-bold mb-4">Avis</h2>
                <Button onClick={toggleSortOrder} className="mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Trier par date ({sortOrder === 'asc' ? 'ascendant' : 'descendant'})
                </Button>
                <List>
                  {reviews && reviews.map((review) => (
                    <ListItem key={review.id} className="border-b border-gray-200 py-2">
                      <Rating value={review.rating} readOnly className="mb-2" />
                      {review.comment && <p className="text-gray-700 mb-1">{review.comment}</p>}
                      <small className="text-gray-500">{new Date(review.date).toLocaleDateString()}</small>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        )
      )}
    </Box>
  );
};

export default BookDetailsPage;

