import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./author.dto";



@Controller('author')
export class AuthorController {
    constructor(private readonly authorService : AuthorService){}

    @Get('')
    public async getAuthors(): Promise<string> {
        return this.authorService.getAuthors();
    }

    // Renvoie un auteur en fonction de l'id passé en paramètre
    @Get('/:id')
    public async getAuthorById(@Param('id') id: string): Promise<string> {
        return this.authorService.getAuthorById(id);
    }

    // Crée un auteur avec les paramètres passés en paramètres
    @Post()
    public async createAuthor(@Body() data: CreateAuthorDto): Promise<string> {
        return this.authorService.createAuthor(data);
    }
    
}