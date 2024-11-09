import { BookEntity } from '../database/entities/book.entity';
export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  biography: string; 
  image_path: string;
  books?: BookEntity[]; // Tableau des IDs des livres associés à cet auteur
  };
  
  export type CreateAuthorModel = {
    firstName: string;
    lastName: string;
    biography: string; 
    image_path: string;
    books?: BookEntity[]
  };