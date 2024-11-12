import React, { useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';

interface AddBookModalProps {
  author: AuthorModel;  // Accepter un seul auteur, pas un tableau
  onClose: () => void;
}

function AddBookModal({ author, onClose }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState('');

  const handleAddBook = () => {
    // On envoie l'ID de l'auteur dans le corps de la requête pour associer le livre à cet auteur
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, yearPublished, authorId: author.id }),  // Utiliser author.id
    })
      .then(response => response.json())
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de l’ajout du livre:', error));
  };

  return (
    <div>
      <h3>Ajouter un nouveau livre</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du livre" />
      <input value={yearPublished} onChange={(e) => setYearPublished(e.target.value)} placeholder="Année de publication" />
      <button onClick={handleAddBook}>Ajouter</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
}

export default AddBookModal;
