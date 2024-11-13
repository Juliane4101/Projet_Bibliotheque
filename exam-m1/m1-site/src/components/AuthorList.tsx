// src/components/AuthorList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
import SearchBar from './SearchBar';
import SortBy from './SortBy';
import AuthorListStyle from './AuthorListStyle';
import { useRouter } from 'next/navigation';
import AuthorModal from './AuthorModal';

function AuthorList() {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<string>('title');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error('Erreur de récupération des auteurs:', error));
  }, []);

  const goToAuthorsDetails = (id: string) => {
    router.push(`/authors/${id}`);
  };
  const handleAddAuthor = (authorData: { firstName: string; lastName : string; biography : string}) => {
    fetch("http://localhost:3001/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: authorData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthors((prevAuthors) => [...prevAuthors, data]);
      })
      .catch((error) => console.error("Erreur lors de la création du livre:", error));
  };

  return (
    <AuthorListStyle>
      <div>
        <div className="flex space-x-4 mb-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortBy sortCriteria={sortCriteria} onSortChange={setSortCriteria} />
        </div>
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ajouter un auteur
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Liste des auteurs</h1>

        <ul>
          {authors.map((author) => (
            <li key={author.id} className="mb-4">
              <h3 className="text-lg font-bold">
                {author.firstName} {author.lastName}
                <button
                onClick={() => goToAuthorsDetails(author.id)}
                className="m-5 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Voir Détails
              </button>
              </h3>
            
            </li>
          ))}
        </ul>
        {isModalOpen && (
        <AuthorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onAddAuthor={handleAddAuthor} />
        )}
      </div>
      
    </AuthorListStyle>
    
    
  );
}

export default AuthorList;
