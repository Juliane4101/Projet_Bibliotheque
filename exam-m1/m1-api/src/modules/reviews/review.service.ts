import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../database/entities/review.entity';
import { ReviewDTO } from './review.dto';
import { BookEntity } from '../database/entities/book.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  // Créer un avis pour un livre
  async createReview(bookId: string, reviewDto: ReviewDTO): Promise<ReviewEntity> {
    const { comment, rating, date } = reviewDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new Error('Book not found');
    }

    const review = this.reviewRepository.create({
      comment,
      rating,
      date,
      book,
    });

    return this.reviewRepository.save(review);
  }

  // Récupérer tous les avis
  async getAllReviews(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  // Récupérer un livre avec ses avis
  async getBookWithReviews(bookId: string): Promise<BookEntity> {
    return this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['reviews'],
    });
  }

  // Mettre à jour un avis
  async updateReview(id: string, reviewDto: ReviewDTO): Promise<ReviewEntity> {
    const { comment, rating, date } = reviewDto;

   
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new Error('Review not found');
    }

    
    review.comment = comment;
    review.rating = rating;
    review.date = date;

    return this.reviewRepository.save(review);
  }

  // Supprimer un avis
  async deleteReview(id: string): Promise<void> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new Error('Review not found');
    }

    await this.reviewRepository.remove(review);
  }
}
