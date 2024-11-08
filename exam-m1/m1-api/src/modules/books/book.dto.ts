import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateBookDto{
    @IsString()
    titre : string;
    @IsNumber()
    prix : number;
    @IsDate()
    date_parution : Date;
    
}