// src/components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BreadcrumbStyle from './BreadcrumbStyle';

const translations: { [key: string]: string } = {
  'books': 'Livres',
  'authors': 'Auteurs',
  'home': 'Accueil'
  // Ajoutez d'autres traductions ici si nécessaire
};

const Breadcrumbs = () => {
  const pathname = usePathname(); // Récupère l'URL actuelle
  const pathSegments = pathname.split('/').filter(segment => segment); // Divise en segments et filtre les vides
  

  return (
    <BreadcrumbStyle>
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
        <li>
          <Link href="/">{translations['home']}</Link>
          <span> &gt; </span> {/* Utilise ">" comme séparateur */}
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const translatedSegment = translations[segment] || segment;

          return (
            <li key={href} style={{ display: 'flex' }}>
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

