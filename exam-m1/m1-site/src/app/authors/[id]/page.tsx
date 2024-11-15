// app/authors/[id]/page.tsx
import AuthorDetailsPage from '../../../components/AuthorDetailsPage';
import GlobalLayout from '../../../components/GlobalLayout';

export default function AuthorsPageId
() {
  return (
    <GlobalLayout>
      <AuthorDetailsPage />
    </GlobalLayout>
  );
}