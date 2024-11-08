import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./book.dto";


@Injectable()
export class BookService {
    public getBooks():string {
        return "Ceci est un test";
    }

    public getBookById(id : string):string {
        return "Get book "+id;
    }

    public createBook(book : CreateBookDto):string {
        return "Book created";
    }
}