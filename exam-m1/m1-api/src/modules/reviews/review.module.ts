import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../database/entities/review.entity';
import { BookEntity } from '../database/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, BookEntity])], 
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
