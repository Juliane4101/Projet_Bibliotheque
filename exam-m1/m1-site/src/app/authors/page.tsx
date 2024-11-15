// app/authors/page.tsx
import GlobalLayout from '../../../src/components/GlobalLayout';
import AuthorList from '../../components/AuthorList';
import AddAuthorModal from '../../components/AddAuthorModal';

export default function AuthorsPage() {
  return (
    <GlobalLayout>
  
      <AuthorList />
    </GlobalLayout>
  );
}
