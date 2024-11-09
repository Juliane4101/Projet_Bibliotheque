import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto{
    @IsString()
    Nom : string;
    @IsString()
    Prenom : string;
    @IsString()
    Biographie : string;
    
    //manque liste de livre et photo
    
}