import { Type } from "class-transformer";
import {   IsString, Matches, MaxLength,  } from "class-validator";
export class TagDto {
    id:string
    @IsString()
    @MaxLength(30)
    @Matches(/^[\p{L}\s]+$/u,{message:'el campo nombre debe ser obligatorio ademas que solo debe contener letras y espacios '})
    name: string;

    @IsString()
    @MaxLength(100)
    @Matches(/^[\p{L}\p{N}\s.,;:()'"¿?!¡\-]+$/u,{message:'el campo description debe ser obligatoria ademas que solo debe contener letras y espacios'})
    description:string
    
    @IsString()
    @Matches(/^[\p{L}\s]+$/u,{message:'el campo slug debe ser obligatorio ademas que solo debe contener letras y espacios'})
    slug:string
    }

   