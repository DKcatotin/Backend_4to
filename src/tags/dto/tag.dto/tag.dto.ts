import { IsInt, IsString, Matches } from "class-validator";
export class TagDto {
    @IsString()
    @Matches(/^[A-AZa-zÁÉÍÓÚáéíóúÑñ\s]+$/,{message:'el nombre solo debe contener letras y spacios '})
    name: string;
    @IsString()
    description: string;
    @IsInt()
    stock:number;
}
