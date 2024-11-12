"use client";
import React, { useState, useEffect } from 'react';
import { useParams} from 'next/navigation';
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
      .then((data) => {
        setBook(data);
        
      })
      .catch((error) => console.error('Erreur lors de la récupération des livres de l\'auteur:', error));

      fetch(`http://localhost:3001/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
        console.log(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des livres de l\'auteur:', error));



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
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        book && (
          <>
            <h1>{book.title}</h1>
            
            <p><strong>Année de publication:</strong> {book.yearPublished}</p>
            <p>
              <strong>Auteur:</strong>{" "}
              <a href ={`http://localhost:3000/authors/${book.author.id}`}>{book.author.firstName} {book.author.lastName}</a>
            </p>
            {/* <p><strong>prix:</strong> {book.price}</p> */}

            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Supprimer
            </Button>

            <Modal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: '300px', marginTop: '20%' }}>
                <h3>Êtes-vous sûr de vouloir supprimer ce livre ?</h3>
                <Button onClick={handleDelete} variant="contained" color="error">Confirmer</Button>
                <Button onClick={() => setDeleteModalOpen(false)} variant="outlined">Annuler</Button>
              </Box>
            </Modal>

            <Button variant="contained" onClick={() => setDrawerOpen(true)} startIcon={<Book />}>
              Voir les avis
            </Button>

            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 300, padding: 2 }}>
                <h2>Avis</h2>
                <Button onClick={toggleSortOrder}>
                  Trier par date ({sortOrder === 'asc' ? 'ascendant' : 'descendant'})
                </Button>
                <List>
                  {reviews && reviews.map((review) => (
                    <ListItem key={review.id} sx={{ display: 'block', marginBottom: 2 }}>
                      <Rating value={review.rating} readOnly />
                      {review.comment && <p>{review.comment}</p>}
                      <small>{new Date(review.date).toLocaleDateString()}</small>
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
