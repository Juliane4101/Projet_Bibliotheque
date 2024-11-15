import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity} from '../database/entities/author.entity';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { UpdateAuthorDto } from '../authors/author.dto';

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

  public async findAuthorById(id: string): Promise<AuthorModel | null> {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'], // Charger les livres associés, si nécessaire
    });
  }

  // Create a new author
  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );
    return result;
  }

  public async deleteAuthor(id: string): Promise<void> {
    // Chercher l'auteur avec ses livres associés (si nécessaire)
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],  // Charge les livres associés pour pouvoir gérer la suppression
    });
  
    // Si l'auteur n'existe pas, on lance une erreur
    if (!author) {
      console.log("Author not found");
    }
  
    // Maintenant, on supprime l'auteur
    await this.authorRepository.delete(id);
  }

  public async updateAuthor(id: string, updateData: UpdateAuthorDto): Promise<AuthorModel | null> {
    await this.authorRepository.update(id, updateData);
    return this.findAuthorById(id); // Retourne l'auteur mis à jour
  }

  public async save(author: AuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(author);  // Utilise le repository pour sauvegarder ou mettre à jour l'auteur
  }
  
  public async getBooksByAuthorId(id : string):Promise<AuthorModel|undefined> {
    return this.authorRepository.findOneOrFail({
        where : {id}, 
        relations : {books : true}
    });
}
}
