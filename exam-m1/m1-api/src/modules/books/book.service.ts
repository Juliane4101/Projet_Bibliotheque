import { Injectable } from "@nestjs/common";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { BookModel } from "./book.model";
import { BookRepository } from "./book.repository";


@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    public getBooks():BookModel[] {
        return this.bookRepository.getBooks();
    }

    public getBookById(id : string):BookModel|undefined {
        return this.bookRepository.getBookById(id);
    }

    public createBook(book : CreateBookDto):string {
        return this.bookRepository.createBook(book);
    }

    public updateBook(id : string, book : UpdateBookDto):string {
        return this.bookRepository.updateBook(id,book);
    }

    public deleteBook(id : string) : string {
        return this.bookRepository.deleteBook(id);
    }
}