import React, { useState } from 'react';
import { BookModel } from '../../../m1-api/src/modules/books/book.model';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';

interface AddBookModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddBook : (bookData: { title: string; yearPublished: number; authorId : string; price: number}) => void;
}

function AddBookModal({ isModalOpen, setIsModalOpen }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState('');
 
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      title,
      yearPublished: parseInt(yearPublished, 10),
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
function onAddBook(bookData: { title: string; yearPublished: number; price: number; }) {
  throw new Error('Function not implemented.');
}

