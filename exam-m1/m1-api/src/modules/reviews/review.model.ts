export class ReviewModel {
    constructor(
      public id: number,
      public comment: string,
      public rating: number,
      public bookId: number, 
    ) {}
  }
  