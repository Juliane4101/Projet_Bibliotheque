"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
import AuthorBooksList from './AuthorBooksList';
import EditAuthorForm from './EditAuthorForm';
import AddBookModal from './AddBookModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function AuthorDetailsPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<AuthorModel | null>(null);
  //const [books, setBooks] = useState<BookModel[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Récupérer les détails de l'auteur et les livres associés
  useEffect(() => {
    fetch(`http://localhost:3001/authors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data); // On enregistre les détails de l'auteur
      })
      .catch((error) => console.error('Erreur lors de la récupération des détails de l\'auteur:', error));

    fetch(`http://localhost:3001/authors/book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
        
      })
      .catch((error) => console.error('Erreur lors de la récupération des livres de l\'auteur:', error));
  }, [id]);

  if (!author) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{author.firstName} {author.lastName}</h1>
      <img src={author.image_path} alt={`${author.firstName} ${author.lastName}`} />
      <p>{author.biography}</p>

      <button onClick={() => setIsEditMode(true)}>Modifier l'auteur</button>
      <button onClick={() => setIsAddBookModalOpen(true)}>Ajouter un livre</button>
      <button onClick={() => setIsDeleteModalOpen(true)}>Supprimer l'auteur</button>

      {/* Afficher les livres de l'auteur */}
          
      { author.books && author.books.length > 0 ? (
        <AuthorBooksList books={author.books} />
      ) : (
        <p>Aucun livre trouvé</p>
        
      )}

      {/* Formulaire de modification de l'auteur */}
      {isEditMode && (
        <EditAuthorForm author={author} onClose={() => setIsEditMode(false)} />
      )}

      {/* Modale pour ajouter un livre */}
      {isAddBookModalOpen && (
        <AddBookModal author={author} onClose={() => setIsAddBookModalOpen(false)} />
      )}

      {/* Modale de confirmation de suppression */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={() => {
            // Logique de suppression de l'auteur
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
  );
}

export default AuthorDetailsPage;
