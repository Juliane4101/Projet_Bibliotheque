import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';
import { AuthorPresenter } from './author.presenter';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  public async listAuthors(): Promise<AuthorPresenter[]> {
    const authors = await this.authorService.listAuthors();

    return authors.map(AuthorPresenter.from);
  }

  @Post()
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    const author = await this.authorService.createAuthor(input);

    return AuthorPresenter.from(author);
  }
}
