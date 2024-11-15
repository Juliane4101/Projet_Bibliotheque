'use client';

import { useRouter } from 'next/navigation';
import HeaderStyle from './HeaderStyle';
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
      <HeaderStyle>
        <Button onClick={goToHomePage}>Accueil</Button>
        <Button onClick={goToBooksPage}>Liste des livres</Button>
        <Button onClick={goToAuthorsPage}>Liste des auteurs</Button>
      </HeaderStyle>
      <div>
        <Breadcrumbs  />
      </div>
      <main>
        {children}
      </main>
    </div>
  );
}


