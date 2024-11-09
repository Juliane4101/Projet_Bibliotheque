import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDTO } from './review.dto';
import { ReviewEntity } from '../database/entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Route GET pour obtenir tous les avis
  @Get()
  async getAllReviews(): Promise<ReviewEntity[]> {
    return this.reviewService.getAllReviews();
  }

  // Route GET pour obtenir les avis d'un livre spécifique
  @Get(':bookId')
  async getReviewsByBook(@Param('bookId') bookId: string) {
    const book = await this.reviewService.getBookWithReviews(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    return {
      book: {
        id: book.id,
        title: book.title,
        yearPublished: book.yearPublished,
      },
      reviews: book.reviews.map(review => ({
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        date: review.date,
      })),
    };
  }

  // Route POST pour créer un nouvel avis
  @Post()
  async createReview(@Body() reviewDto: ReviewDTO) {
    const { comment, rating, date, bookId } = reviewDto;

    if (!bookId) {
      throw new Error('BookId is required');
    }

    return this.reviewService.createReview(bookId, { comment, rating, date });
  }

  // Route PUT pour mettre à jour un avis
  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() reviewDto: ReviewDTO) {
    return this.reviewService.updateReview(id, reviewDto);
  }

  // Route DELETE pour supprimer un avis
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
