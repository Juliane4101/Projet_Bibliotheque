import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity } from '../database/entities/author.entity';
import { BookEntity } from '../database/entities/book.entity'; // Import the BookEntity
import { AuthorModel, CreateAuthorModel } from './author.model';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  // List all authors
  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find({
      relations: ['books'], // Load the related books when listing authors
    });
  }

  // Create a new author
  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );
    return result;
  }

  // Create a new author and associate books
  public async createAuthorWithBooks(
    input: CreateAuthorModel,
    books: BookEntity[],
  ): Promise<AuthorModel> {
    // Create the author
    const author = this.authorRepository.create(input);

    // Associate the books with the author
    author.books = books;

    // Save the author with associated books
    return this.authorRepository.save(author);
  }

  // Helper method to fetch books by IDs
  public async findBooksByIds(bookIds: string[]): Promise<BookEntity[]> {
    return this.dataSource.getRepository(BookEntity).findByIds(bookIds);
  }
}
