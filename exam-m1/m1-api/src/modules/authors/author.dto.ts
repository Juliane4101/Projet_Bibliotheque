import { IsArray, IsOptional, IsString } from "class-validator";

export declare class CreateAuthorDto{
    @IsString()
    firstName : string;
    @IsString()
    lastName : string;
    @IsString()
    biography : string;
    @IsString()
    image_path : string;
    @IsOptional()
    @IsArray()
    bookIds?: string[];
}

