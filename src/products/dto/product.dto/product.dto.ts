import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    IsPositive,
  } from 'class-validator';
  
  export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido' })
    @IsPositive({ message: 'El precio debe ser mayor que cero' })
    precio: number;
  
    @IsNumber()
    @Min(1, { message: 'El stock debe ser mayor o igual a 1' })
    stock: number;
  
    @IsString()
    @IsNotEmpty()
    category: string;
  
    @IsNumber()
    userId: number; // para asociar el producto al usuario
  }
  