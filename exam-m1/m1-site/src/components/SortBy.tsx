"use client"
import React from 'react';

interface SortByProps {
  sortCriteria: string;
  onSortChange: (criteria: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ sortCriteria, onSortChange }) => {
  return (
    <div>
      <label htmlFor="sort">Trier par :</label>
      <select
        id="sort"
        value={sortCriteria}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="title">Titre</option>
        <option value="yearPublished">Année de publication</option>
      </select>
    </div>
  );
};

export default SortBy;
