import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BookRepository } from "./book.repository";
import { AuthorModule } from "../authors/author.module";

@Module({
    imports: [AuthorModule],
    controllers : [BookController],
    providers : [BookService,BookRepository]
})
export class BookModule {}
