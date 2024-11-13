import React, { useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';

interface AddAuthorModalProps {
  author: AuthorModel;  // Accepter un seul auteur, pas un tableau
  onClose: () => void;
}

function AddAuthorModal({ author, onClose }: AddAuthorModalProps) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [biography, setBiography] = useState('');

  const handleAddAuthor = () => {
    // On envoie l'ID de l'auteur dans le corps de la requête pour associer le livre à cet auteur
    fetch('http://localhost:3001/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, biography }),  // Utiliser author.id
    })
      .then(response => response.json())
      .then(() => onClose())
      .catch(error => console.error("Erreur lors de l’ajout de l'auteur:", error));
  };

  return (
    <div>
      <h3>Ajouter un nouvel auteur</h3>
      <input value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="Prénom" />
      <input value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder="Nom" />
      <input value={biography} onChange={(e) => setBiography(e.target.value)} placeholder="Biographie" />
      <button onClick={handleAddAuthor}>Ajouter</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
}

export default AddAuthorModal;
