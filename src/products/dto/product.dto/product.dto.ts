import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsPositive,
  Matches,
  IsArray,
  IsInt,
  IsOptional,
} from 'class-validator';

export class ProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo name es requerido' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo description es requerido' })
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El campo precio debe ser requerido y debe ser mayor que cero' })
  precio: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(1, { message: 'El stock debe ser mayor o igual a 1' })
  stock: number;

  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo category es requerido' })
  @Matches(/^[\p{L}\s]+$/u, { message: 'El campo category debe contener solo letras y espacios' })
  category: string; 

  @IsNumber({}, { message: 'El userId debe ser un número' })
  @IsNotEmpty({ message: 'El campo userId es requerido' })
  userId: number;

  @IsOptional()
  @IsArray()
  sizes?: { size: string, type: string }[]
}
