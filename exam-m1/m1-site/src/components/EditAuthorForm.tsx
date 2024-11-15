import React, { useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
function EditAuthorForm({  author, onClose }: { author: AuthorModel; onClose: () => void }) {
  const [firstName, setfirstName] = useState(author.firstName);
  const [lastName, setlastName] = useState(author.lastName);
  const [biography, setBiography] = useState(author.biography);
  const [image_path, setimage_path] = useState(author.image_path);

  const handleSubmit = () => {
    fetch(`http://localhost:3001/authors/${author.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, biography, image_path }),
    })
      .then(response => response.json())
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Prénom:
        <input value={firstName} onChange={(e) => setfirstName(e.target.value)} />
      </label>
      <label>Nom:
        <input value={lastName} onChange={(e) => setlastName(e.target.value)} />
      </label>
      <label>Biographie:
        <textarea value={biography} onChange={(e) => setBiography(e.target.value)} />
      </label>
      <label>URL de la photo:
        <input value={image_path} onChange={(e) => setimage_path(e.target.value)} />
      </label>
      <button type="submit">Sauvegarder</button>
      <button onClick={onClose}>Annuler</button>
    </form>
  );
}

export default EditAuthorForm;
