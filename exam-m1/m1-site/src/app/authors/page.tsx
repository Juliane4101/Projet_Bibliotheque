// app/authors/page.tsx
import GlobalLayout from '../../../src/components/GlobalLayout';
import AuthorList from '../../components/AuthorList';

export default function AuthorsPage() {
  return (
    <GlobalLayout>
      <h1>Auteurs</h1>
      <p>Voici la liste des auteurs présents dans la bibliothèque :</p>
      <AuthorList />
    </GlobalLayout>
  );
}
