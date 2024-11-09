import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity,AuthorId} from '../database/entities/author.entity';
import { BookEntity} from '../database/entities/book.entity'; // Import the BookEntity
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

  // Helper method to fetch books by IDs
  public async findBooksByIds(AuthorId: string[]): Promise<BookEntity[]> {
    return this.dataSource.getRepository(BookEntity).findByIds(AuthorId);
  }

  public async deleteAuthor(id : AuthorId) : Promise<void> {
    await this.authorRepository.delete(id);
  }
}
