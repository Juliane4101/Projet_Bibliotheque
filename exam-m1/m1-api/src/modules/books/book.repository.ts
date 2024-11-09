import { Injectable } from "@nestjs/common";
import { BookModel } from "./book.model";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { DataSource } from "typeorm";
import { BookEntity } from "../database/entities/book.entity";

@Injectable()
export class BookRepository {
    private readonly bookRepository = this.dataSource.getRepository(BookEntity)

    constructor(private readonly dataSource : DataSource){};

    public getBooks():Promise<BookModel[]>{
        return ;
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