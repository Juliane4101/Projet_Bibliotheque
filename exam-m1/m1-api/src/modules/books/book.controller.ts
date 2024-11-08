import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./book.dto";

@Controller('books')
export class BookController {
    constructor(private readonly bookService : BookService){}

    // Renvoie la liste complète des livres
    @Get('')
    public async getBooks(): Promise<string>{
        return this.bookService.getBooks()
    }

    // Renvoie un livre en fonction de l'id passé en paramètre
    @Get('/:id')
    public async getBookById(@Param('id') id : string): Promise<string> {
        return this.bookService.getBookById(id);
    }

    // Crée un livre avec les paramètres passés en paramètres
    @Post()
    public async createBook(@Body() data : CreateBookDto) : Promise<string> {
        return this.bookService.createBook(data);
    }
}