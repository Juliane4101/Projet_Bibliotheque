import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository} from './author.repository';
import { CreateAuthorDto } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.listAuthors();
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(input);
  }

  public deleteAuthor(id : string) : void {
    this.authorRepository.deleteAuthor(id);
  }

  public async getAuthorById(id: string): Promise<AuthorModel | null> {
    return this.authorRepository.findAuthorById(id);
  }

  public async updateAuthor(
    id: string,
    updateData: CreateAuthorDto,
  ): Promise<AuthorModel> {
    const author = await this.authorRepository.findAuthorById(id);
    if (!author) {
      throw new Error("Author not found");
    }

    // Mettre à jour les propriétés de l'auteur
    author.firstName = updateData.firstName || author.firstName;
    author.lastName = updateData.lastName || author.lastName;
    author.biography = updateData.biography || author.biography;
    author.image_path = updateData.image_path || author.image_path;



    return this.authorRepository.save(author);
  }

}
