"use client";
import React, { useState } from 'react';


interface AddBookModalProps {
  authorId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddBook : (bookData: { title: string; yearPublished: number; authorId : string; price: number}) => void;
}

function AddBookModal({ isModalOpen, setIsModalOpen, authorId, onAddBook }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      title,
      yearPublished: parseInt(yearPublished, 10),
      authorId,
      price: parseInt(price, 10),
    };
    onAddBook(bookData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3>Ajouter un nouveau livre</h3>
      <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du livre" />
      <input value={yearPublished} onChange={(e) => setYearPublished(e.target.value)} placeholder="Année de publication" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Prix" />
      <button type="submit" >Ajouter</button>
      <button type="button" onClick={() => setIsModalOpen(false)}>Fermer</button>
      </form>   
    </div>
  );
}

export default AddBookModal;


