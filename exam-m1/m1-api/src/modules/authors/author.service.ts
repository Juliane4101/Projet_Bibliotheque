import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository} from './author.repository';
import {AuthorId} from '../database/entities/author.entity'

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.listAuthors();
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(input);
  }

  public deleteAuthor(id : AuthorId) : void {
    this.authorRepository.deleteAuthor(id);
  }

}
