import React from 'react';

interface DeleteConfirmationModalProps {
    onConfirm: () => void;
    onClose: () => void;
    }



function DeleteConfirmationModal({ onConfirm, onClose }: DeleteConfirmationModalProps) {
  return (
    <div>
      <p>Es-tu sûr de vouloir supprimer cet auteur ?</p>
      <button onClick={onConfirm}>Confirmer</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
}

export default DeleteConfirmationModal;
