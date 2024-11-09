import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDTO } from './review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':bookId')
  createReview(
    @Param('bookId') bookId: number,
    @Body() reviewDto: ReviewDTO,
  ) {
    return this.reviewService.createReview(bookId, reviewDto);
  }

  @Get(':bookId')
  getReviewsByBook(@Param('bookId') bookId: number) {
    return this.reviewService.getReviewsByBook(bookId);
  }
}
