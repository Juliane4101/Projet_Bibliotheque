import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./author.dto";



@Controller('author')
export class AuthorController {
    constructor(private readonly authorService : AuthorService){}

    
}