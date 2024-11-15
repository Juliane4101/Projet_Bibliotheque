import React, { useState } from 'react';
//import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';

interface AddAuthorModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAuthor : (authordata: { firstName: string; lastName: string; biography: string}) => void;
}

function AddAuthorModal({ isModalOpen, setIsModalOpen }: AddAuthorModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [biography, setBiography] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authorData = {
      firstName,
      lastName,
      biography,
    };
    onAddAuthor(authorData);
    setIsModalOpen(false);
  };


  return (
    <div>
      <h3>Ajouter un nouvel auteur</h3>
      <form onSubmit={handleSubmit}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" />
      <input value={biography} onChange={(e) => setBiography(e.target.value)} placeholder="Biography" />
      <button type="submit" >Ajouter</button>
      <button type="button" onClick={() => setIsModalOpen(false)}>Fermer</button>
      </form>   
    </div>
  );
}

export default AddAuthorModal;
function onAddAuthor(authorData: { firstName: string; lastName: string; biography: string;}) {
  throw new Error('Function not implemented.');
}
