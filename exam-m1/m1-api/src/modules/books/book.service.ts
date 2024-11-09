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

    public createBook(book : CreateBookDto):Promise<BookModel> {
        return this.bookRepository.createBook(book);
    }

    public updateBook(id : BookId, book : UpdateBookDto):void {
        this.bookRepository.updateBook(id,book);
    }

    public deleteBook(id : BookId) : void {
        this.bookRepository.deleteBook(id);
    }
}