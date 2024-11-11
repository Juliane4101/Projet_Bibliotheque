// src/components/GlobalLayout.tsx
'use client';

import { useRouter } from 'next/navigation';
import './GlobalLayout.css'
import Breadcrumbs from './Breadcrumbs';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/');
  };

  const goToBooksPage = () => {
    router.push('/books');
  };

  const goToAuthorsPage = () => {
    router.push('/authors');
  };

  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={goToHomePage}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '10px' }}
        >
          Accueil
        </button>
        <button
          onClick={goToBooksPage}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '10px' }}
        >
          Listes des livres 
        </button>
        <button
          onClick={goToAuthorsPage}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Listes des auteurs
        </button>
        <Breadcrumbs />
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

