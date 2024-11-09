import { DataSource } from 'typeorm';
import { AuthorEntity } from '../database/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );

    return result;
  }
}
