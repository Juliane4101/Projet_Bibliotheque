import { Injectable } from "@nestjs/common";
import { BookModel } from "./book.model";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { DataSource } from "typeorm";
import { BookEntity, BookId } from "../database/entities/book.entity";

@Injectable()
export class BookRepository {
    private readonly bookRepository = this.dataSource.getRepository(BookEntity)

    constructor(private readonly dataSource : DataSource){};

    // On va chercher et renvoyer tous les livres de la BD
    public async getBooks():Promise<BookModel[]>{
        return this.bookRepository.find({relations : {author : true}});
    }

    // On va chercher le livre ayant l'id passé en paramètre
    public async getBookById(id : BookId):Promise<BookModel|undefined> {
        return await this.bookRepository.findOneOrFail({where : {id}});
    }

    public createBook(book : CreateBookDto):string {
        return "Book created";
    }

    public updateBook(id : BookId, data : UpdateBookDto):string {
        return "Book updated";
    }

    public deleteBook(id : BookId) : string {
        return "Book deleted";
    }
}