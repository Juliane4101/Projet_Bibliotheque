// app/authors/[id]/page.tsx
import AuthorDetailsPage from '../../../components/AuthorDetailsPage';
import GlobalLayout from '../../../components/GlobalLayout';

export default function AuthorsPageId
() {
  return (
    <GlobalLayout>
      <h1>Auteurs</h1>
      <AuthorDetailsPage />
    </GlobalLayout>
  );
}