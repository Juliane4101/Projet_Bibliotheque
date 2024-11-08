import { Injectable } from "@nestjs/common";


@Injectable()
export class BookService {
    public getBooks(){
        return "Ceci est un test";
    }
}