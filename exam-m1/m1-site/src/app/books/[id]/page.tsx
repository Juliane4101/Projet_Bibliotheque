// app/books/[id]/page.tsx
import GlobalLayout from '../../../components/GlobalLayout';
import BookDetailsPage from '../../../components/BookDetailsPage';

export default function BooksPageId() {
  return (
    <GlobalLayout>
      <BookDetailsPage/>
    </GlobalLayout>
  );
}