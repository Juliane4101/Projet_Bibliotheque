'use client';

import React, { useEffect, useState } from 'react';
import { AuthorModel } from '../../../m1-api/src/modules/authors/author.model';
import SearchBar from './SearchBar';
import AuthorListStyle from './AuthorListStyle';
import { useRouter } from 'next/navigation';
import AuthorModal from '../modales/AuthorModal';

function AuthorList() {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<AuthorModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Récupérer les auteurs au chargement de la page
  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
        setFilteredAuthors(data); // Initialiser avec tous les auteurs
      })
      .catch((error) => console.error('Erreur de récupération des auteurs:', error));
  }, []);

  // Mettre à jour la liste filtrée à chaque modification de la recherche
  useEffect(() => {
    const filtered = authors.filter((author) =>
      `${author.firstName} ${author.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredAuthors(filtered);
  }, [searchQuery, authors]); // Dépend des auteurs et de la recherche

  const goToAuthorsDetails = (id: string) => {
    router.push(`/authors/${id}`);
  };

  const handleAddAuthor = (authorData: { firstName: string; lastName: string; biography: string }) => {
    fetch('http://localhost:3001/authors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthors((prevAuthors) => [...prevAuthors, data]);
      })
      .catch((error) => console.error('Erreur lors de la création de l’auteur:', error));
  };

  return (
    <AuthorListStyle>
      <div>
        <div className="flex space-x-4 mb-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
          {filteredAuthors.map((author) => (
            <li key={author.id} className="mb-4">
              <h3 className="text-lg font-bold">
                {author.firstName} {author.lastName} {author.id}
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
