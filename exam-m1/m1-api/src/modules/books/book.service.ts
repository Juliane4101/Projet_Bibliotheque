import { Injectable } from "@nestjs/common";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { BookModel } from "./book.model";
import { BookRepository } from "./book.repository";
import { BookId } from "../database/entities/book.entity";


@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    public async getBooks():Promise<BookModel[]> {
        return this.bookRepository.getBooks();
    }

    public async getBookById(id : BookId):Promise<BookModel|undefined> {
        return this.bookRepository.getBookById(id);
    }

    public createBook(book : CreateBookDto):string {
        return this.bookRepository.createBook(book);
    }

    public updateBook(id : BookId, book : UpdateBookDto):string {
        return this.bookRepository.updateBook(id,book);
    }

    public deleteBook(id : BookId) : string {
        return this.bookRepository.deleteBook(id);
    }
}