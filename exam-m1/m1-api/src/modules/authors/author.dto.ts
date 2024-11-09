import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto{
    @IsString()
    Nom : string;
    @IsString()
    Prenom : string;
    @IsString()
    Biographie : string;
    @IsString()
    Chemin_image : string;
    @IsOptional()
    @IsArray()
    bookIds?: string[];
    
}