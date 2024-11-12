"use client"
import React, { useState } from 'react';

interface BookModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddBook: (bookData: { title: string; yearPublished: number; authorId: string }) => void;
}

function BookModal({ isModalOpen, setIsModalOpen, onAddBook }: BookModalProps) {
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      title,
      yearPublished: parseInt(yearPublished, 10),
      authorId,
    };
    onAddBook(bookData);
    setIsModalOpen(false);
  };

  return (
    <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Ajouter un nouveau livre</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Année de publication:
            <input type="text" value={yearPublished} onChange={(e) => setYearPublished(e.target.value)} required />
          </label>
          <label>
            ID de l'auteur:
            <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
          </label>
          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Fermer</button>
        </form>
      </div>
    </div>
  );
}

export default BookModal;
