// src/components/GlobalLayout.tsx
'use client';

import { useRouter } from 'next/navigation';
import HeaderStyle from './HeaderStyle'; // Import du composant HeaderStyle
import Breadcrumbs from './Breadcrumbs';
import {Button} from './Button'

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
      {/* Utilisation de HeaderStyle sans condition sur router.pathname */}
  
      <HeaderStyle>
        <Button onClick={goToHomePage}>Accueil</Button>
        <Button onClick={goToBooksPage}>Liste des livres</Button>
        <Button onClick={goToAuthorsPage}>Liste des auteurs</Button>
      </HeaderStyle>

      {/* Breadcrumbs */}
      <div>
        <Breadcrumbs  />
      </div>

      {/* Contenu principal */}
      <main>
        {children}
      </main>
    </div>
  );
}


