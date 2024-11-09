import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewRepository {
  private reviews: ReviewModel[] = [];
  private idCounter = 1;

  createReview(bookId: number, comment: string, rating: number, date: Date): ReviewModel {
    const reviewDate = date ? new Date(date) : new Date();
    const formattedDate = reviewDate.toISOString().split('T')[0]; 
    const review = new ReviewModel(this.idCounter++, comment, rating, bookId, formattedDate);
    this.reviews.push(review);
    return review;
  }

  findReviewsByBook(bookId: number): ReviewModel[] {
    return this.reviews.filter(review => review.bookId === bookId);
  }
}
