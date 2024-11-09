import { Repository } from 'typeorm';
import { ReviewEntity } from '../database/entities/review.entity';
import { BookEntity } from '../database/entities/book.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewDTO } from './review.dto';

@Injectable()
export class ReviewRepository {
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

    // Créer un nouvel avis
    const review = this.reviewRepository.create({
      comment,
      rating,
      date,
      book,
    });

    // Sauvegarder
    return this.reviewRepository.save(review);
  }

  // Récupérer les avis d'un livre
  async findReviewsByBook(bookId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({ where: { book: { id: bookId } } });
  }
}
