// app/books/page.tsx
import GlobalLayout from '../../../src/components/GlobalLayout';
import BookList from '../../components/BookList';

export default function BooksPage() {
  return (
    <GlobalLayout>
      <BookList />
    </GlobalLayout>
  );
}
