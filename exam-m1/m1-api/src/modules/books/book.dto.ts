import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

// Auteur lié au livre
export declare class CreateBookAuthorDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
}

// Création d'un livre
export declare class CreateBookDto {
    @IsString()
    title: string;
    @IsInt()
    @Max(2024)
    @Min(-10000)
    yearPublished: number;
    @IsString()
    authorId: string;
}

// Création de plusieurs livres d'un coup
export declare class CreateBooksDto {
    @IsOptional()
    book: CreateBookDto;
    @IsOptional()
    books: CreateBookDto[];
}

// Mise à jour d'un livre
export declare class UpdateBookDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsInt()
    @IsOptional()
    yearPublished: number;
    @IsString()
    authorId: string;
}