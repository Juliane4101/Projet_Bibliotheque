import React, { useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
function EditAuthorForm({  author, onClose }: { author: AuthorModel; onClose: () => void }) {
  const [name, setName] = useState(author.firstName);
  const [biography, setBiography] = useState(author.biography);
  const [photo, setPhoto] = useState(author.image_path);

  const handleSubmit = () => {
    fetch(`http://localhost:3001/authors/${author.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, biography, photo }),
    })
      .then(response => response.json())
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nom:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>Biographie:
        <textarea value={biography} onChange={(e) => setBiography(e.target.value)} />
      </label>
      <label>URL de la photo:
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} />
      </label>
      <button type="submit">Sauvegarder</button>
      <button onClick={onClose}>Annuler</button>
    </form>
  );
}

export default EditAuthorForm;
