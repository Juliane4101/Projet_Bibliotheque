import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./author.dto";


@Injectable()
export class AuthorService {
    public getAuthors():string {
        return "Ceci est un test";
    }

    public getAuthorById(id : string):string {
        return "Get Author "+id;
    }

    public createAuthor(author : CreateAuthorDto):string {
        return "Author created";
    }
}