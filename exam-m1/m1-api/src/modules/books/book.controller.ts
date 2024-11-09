import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBooksDto, UpdateBookDto } from "./book.dto";
import { BookModel } from "./book.model";

@Controller('books')
export class BookController {
    constructor(private readonly bookService : BookService){}

    // Renvoie la liste complète des livres
    @Get('')
    public async getBooks(): Promise<BookModel[]>{
        return this.bookService.getBooks()
    }

    // Renvoie un livre en fonction de l'id passé en paramètre
    @Get(':id')
    public async getBookById(@Param('id') id : string): Promise<BookModel> {
        return this.bookService.getBookById(id);
    }

    // Crée un (ou plusieurs) livre avec les paramètres passés en paramètres
    @Post()
    public async createBook(@Body() data : CreateBooksDto) : Promise<string|string[]> {
        // Si on ne crée qu'un livre
        if (data.book){
            return this.bookService.createBook(data.book);
        }
        
        // Si on crée plus d'un livre, càd on a une liste de livres
        if (data.books){
            return Promise.all( // Alors pour chaque élément de la liste on crée le livre correspondant
                data.books.map((book)=> this.bookService.createBook(book))
            )
        }
    }

    // Met à jour le livre correspondant à l'id en fonction des paramètres passés
    @Patch(":id")
    public async updateBook(@Param('id') id : string, @Body() data : UpdateBookDto) : Promise<string> {
        return this.bookService.updateBook(id,data);
    }

    // Supprime le livre associé à l'id donné
    @Delete(':id')
    public async deleteBook(@Param('id') id : string) : Promise<string> {
        return this.bookService.deleteBook(id);
    }
}