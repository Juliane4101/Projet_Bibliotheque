import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewRepository {
  private reviews: ReviewModel[] = [];
  private idCounter = 1;

  createReview(bookId: number, comment: string, rating: number): ReviewModel {
    const review = new ReviewModel(this.idCounter++, comment, rating, bookId);
    this.reviews.push(review);
    return review;
  }

  findReviewsByBook(bookId: number): ReviewModel[] {
    return this.reviews.filter(review => review.bookId === bookId);
  }
}
