// app/books/page.tsx
import GlobalLayout from '../../../src/components/GlobalLayout';
import BookList from '../../components/BookList';

export default function BooksPage() {
  return (
    <GlobalLayout>
      <h1>Livres</h1>
      <p> Voici la liste des livres dans la bibliothèque :</p>
      <BookList />
    </GlobalLayout>
  );
}
