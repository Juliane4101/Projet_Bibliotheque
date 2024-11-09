import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewDTO } from './review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  createReview(bookId: number, reviewDto: ReviewDTO): ReviewModel {
    const { comment, rating, date } = reviewDto;
    const reviewDate = date ? new Date(date) : new Date(); 

    return this.reviewRepository.createReview(bookId, comment, rating, reviewDate);
  }

  getReviewsByBook(bookId: number): ReviewModel[] {
    return this.reviewRepository.findReviewsByBook(bookId);
  }
}
