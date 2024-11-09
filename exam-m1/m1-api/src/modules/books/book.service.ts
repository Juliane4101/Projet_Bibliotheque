import { Injectable } from "@nestjs/common";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { BookModel } from "./book.model";


@Injectable()
export class BookService {
    public getBooks():BookModel[] {
        return [];
    }

    public getBookById(id : string):BookModel|undefined {
        return undefined;
    }

    public createBook(book : CreateBookDto):string {
        return "Book created";
    }

    public updateBook(id : string, data : UpdateBookDto):string {
        return "Book updated";
    }

    public deleteBook(id : string) : string {
        return "Book deleted";
    }
}