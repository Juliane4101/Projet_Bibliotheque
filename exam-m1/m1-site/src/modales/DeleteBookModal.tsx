"use client";
import React, { useState } from 'react';
import { BookModel } from '../../../m1-api/src/modules/books/book.model';

interface DeleteBookModalProps {
  book: BookModel;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const handleDelete = async (book: BookModel) => {
    try {
    const response = await fetch(`http://localhost:3001/books/${book.id}`, { method: 'DELETE' });
    if (response.ok) {
        setIsModalOpen(false);
    }
    } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    }
  };

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ book, setIsModalOpen }) => {
   
    handleDelete(book);
    
    return (
        <div>
            <p>Êtes-vous sûr de vouloir supprimer le livre {book.title} ?</p>
            <button onClick={() => setIsModalOpen(false)}>Annuler</button>
            <button onClick={() => handleDelete(book)}>Supprimer</button>
        </div>
    );
    }

export default DeleteBookModal;

function setIsModalOpen(arg: boolean) {
    throw new Error('Function not implemented.');
}
