
// Book model avec toutes les caractéristiques d'un livre
export type BookModel = {
    id: string;
    title: string;
    price: number;
    yearPublished: number;
    author: {
      id : string;
      firstName: string;
      lastName: string;
    };
  };
  
  // Ici les caractéristiques d'un auteur utile à un livre
  export type CreateBookAuthorModel = {
    firstName: string;
    lastName: string;
  };
  
  // Ici les paramètres du livres nécessaires lors de sa création
  export type CreateBookModel = {
    title: string;
    yearPublished: number;
    price : number;
    author: CreateBookAuthorModel;
  };
  
  // Ici on spécifie que la mise à jour d'un livre est la même chose que la création,
  // seulement les paramètres ne sont plus tous obligatoires
  export type UpdateBookModel = Partial<CreateBookModel>;