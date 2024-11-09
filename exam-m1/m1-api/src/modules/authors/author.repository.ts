import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity} from '../database/entities/author.entity';
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

  public async deleteAuthor(id : string) : Promise<void> {
    await this.authorRepository.delete(id);
  }
}
