import { Type } from "class-transformer";
import { IsDateString, IsInt, IsString, Matches, Max, Min } from "class-validator";

export class ProductDto {
    id:number;
    
        @IsString()
        @Matches(/^[\p{L}\s]+$/u,{message:'el nombre solo debe contener letras y spacios '})
        name: string;
        @Type(() => Number)
        @IsInt({ message: 'La edad debe ser un número entero' })
        @Min(0, { message: 'La edad no puede ser menor que 0' })
        @Max(100, { message: 'La edad no puede ser mayor que 100' })
        age: number;
        
        @IsDateString({}, {
            message: 'La fecha de nacimiento debe tener el formato AAAA-MM-DD',
          })
          birthday: Date;
          @IsString()
          
          residence:string
}
