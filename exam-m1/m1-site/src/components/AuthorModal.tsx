"use client"
import React, { useState } from 'react';

interface AuthorModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAuthor: (authorData: { firstName: string; lastName: string; biography: string}) => void;
}

function AuthorModal({ isModalOpen, setIsModalOpen, onAddAuthor }: AuthorModalProps) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [biography, setbiography] = useState('');
  

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
    <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Ajouter un nouveau livre</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Prénom :
            <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
          </label>
          <label>
           Nom :
            <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
          </label>
          <label>
           Biographie : 
            <input type="text" value={biography} onChange={(e) => setbiography(e.target.value)} required />
          </label>
          
          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Fermer</button>
        </form>
      </div>
    </div>
  );
}

export default AuthorModal;
