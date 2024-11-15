// src/components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BreadcrumbStyle from './BreadcrumbStyle';

const translations: { [key: string]: string } = {
  books: 'Livres',
  authors: 'Auteurs',
  home: 'Accueil',
  // Ajoutez d'autres traductions ici si nécessaire
};

const Breadcrumbs = () => {
  const pathname = usePathname(); // Récupère l'URL actuelle
  const pathSegments = pathname.split('/').filter((segment) => segment); // Divise en segments et filtre les vides
  const [authorNames, setAuthorNames] = useState<{ [id: string]: string }>({}); // Stocke les noms d'auteurs
  const [bookTitles, setBookTitles] = useState<{ [id: string]: string }>({}); // Stocke les titres des livres

  useEffect(() => {
    pathSegments.forEach((segment, index) => {
      // Vérifie si le segment précédent est "authors" pour charger les noms d'auteurs
      if (index > 0 && pathSegments[index - 1] === 'authors' && !authorNames[segment]) {
        fetch(`http://localhost:3001/authors/${segment}`)
          .then((response) => response.json())
          .then((data) => {
            setAuthorNames((prev) => ({ ...prev, [segment]: `${data.firstName} ${data.lastName}` }));
          })
          .catch((error) => console.error(`Erreur de récupération de l'auteur avec ID ${segment}:`, error));
      }
      // Vérifie si le segment précédent est "books" pour charger les titres de livres
      if (index > 0 && pathSegments[index - 1] === 'books' && !bookTitles[segment]) {
        fetch(`http://localhost:3001/books/${segment}`)
          .then((response) => response.json())
          .then((data) => {
            setBookTitles((prev) => ({ ...prev, [segment]: data.title }));
          })
          .catch((error) => console.error(`Erreur de récupération du livre avec ID ${segment}:`, error));
      }
    });
  }, [pathSegments, authorNames, bookTitles]);

  return (
    <BreadcrumbStyle>
      <nav aria-label="Breadcrumb">
        <ol className="flex list-none p-0 space-x-2">
          <li>
            <Link href="/">{translations['home']}</Link>
            <span> &gt; </span> {/* Utilise ">" comme séparateur */}
          </li>
          {pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            // Utilise la traduction, le nom de l'auteur, ou le titre du livre pour chaque segment
            const translatedSegment = translations[segment] || authorNames[segment] || bookTitles[segment] || segment;

            return (
              <li key={href} className="flex">
                <Link href={href}>
                  {decodeURIComponent(translatedSegment.charAt(0).toUpperCase() + translatedSegment.slice(1))}
                </Link>
                {index < pathSegments.length - 1 && <span> &gt; </span>} {/* Utilise ">" comme séparateur */}
              </li>
            );
          })}
        </ol>
      </nav>
    </BreadcrumbStyle>
  );
};

export default Breadcrumbs;


