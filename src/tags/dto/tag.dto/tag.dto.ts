import { Type } from "class-transformer";
import {   IsString, Matches, MaxLength,  } from "class-validator";
export class TagDto {
    id:string
    @IsString()
    @MaxLength(30)
    @Matches(/^[\p{L}\s]+$/u,{message:'el nombre solo debe contener letras y spacios '})
    name: string;

    @IsString()
    @MaxLength(100)
    description:string
    
    @IsString()
    @Matches(/^[\p{L}\s]+$/u,{message:'el nombre solo debe contener letras y spacios '})
    slag:string
    }

   