// src/components/BookList.tsx
"use client";
import React, { useEffect, useState } from "react";
import { BookModel } from "../../../m1-api/src/modules/books/book.model";
import BookModal from "./BookModal";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";
import { useRouter } from "next/navigation";
import BookListStyle from "./BookListStyle"; // Import du fichier de style

function BookList() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("title");
  const [reviewsData, setReviewsData] = useState<{ [bookId: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Récupérer la liste des livres
  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Erreur de récupération des livres:", error));
  }, []);

  const fetchReviews = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${bookId}`);
      const data = await response.json();
      const reviews = data.reviews;
      const averageRating = reviews.length
        ? reviews.reduce(
            (sum: number, review: { rating: number }) => sum + review.rating,
            0
          ) / reviews.length
        : 0;
      setReviewsData((prev) => ({ ...prev, [bookId]: averageRating }));
    } catch (error) {
      console.error(`Erreur de récupération des avis pour le livre ${bookId}:`, error);
    }
  };

  useEffect(() => {
    // Appeler fetchReviews pour chaque livre
    books.forEach((book) => {
      fetchReviews(book.id);
    });
  }, [books]);

  const handleAddBook = (bookData: { title: string; yearPublished: number; authorId: string }) => {
    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book: bookData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, data]);
      })
      .catch((error) => console.error("Erreur lors de la création du livre:", error));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "yearPublished") {
      return a.yearPublished - b.yearPublished;
    }
    return 0;
  });

  const goToBookDetails = (id: string) => {
    router.push(`/books/${id}`);
  };

  return (
    <BookListStyle> {/* Enveloppe tout le contenu avec le style BookListStyle */}
      <div>
        {/* Conteneur pour la barre de recherche et "Trier par" sur la même ligne */}
        <div className="flex space-x-4 mb-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortBy sortCriteria={sortCriteria} onSortChange={setSortCriteria} />
        </div>

        <h1 className="text-2xl font-semibold mb-4">Liste des livres</h1>

        {/* Section Ajouter un livre avec une marge au-dessus */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ajouter un livre
          </button>
        </div>

        <ul>
          {sortedBooks.map((book) => {
            const averageRating = reviewsData[book.id] || 0;

            return (
              <li key={book.id} className="mb-4">
                <h3 className="text-lg font-bold">
                  {book.title} - {book.author.firstName} {book.author.lastName} ({book.yearPublished})
                </h3>
                <div className="flex items-center space-x-2">
                  <strong>Note moyenne : </strong>
                  <span>{averageRating.toFixed(1)} / 5</span>
                  <button
                    onClick={() => goToBookDetails(book.id)} // Appeler la fonction avec l'id du livre
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Voir Détails
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {isModalOpen && (
          <BookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onAddBook={handleAddBook} />
        )}
      </div>
    </BookListStyle>
  );
}

export default BookList;
