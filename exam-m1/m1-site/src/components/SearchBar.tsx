import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)} // Met à jour la query
      />
    </div>
  );
};

export default SearchBar;
