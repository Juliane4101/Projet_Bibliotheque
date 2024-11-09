import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./author.dto";


@Injectable()
export class AuthorService {
    public getAuthor():string {
        return "Ceci est un test";
    }

    public getAuthorById(id : string):string {
        return "Get Author "+id;
    }

    public createAuthor(book : CreateAuthorDto):string {
        return "Author created";
    }
}