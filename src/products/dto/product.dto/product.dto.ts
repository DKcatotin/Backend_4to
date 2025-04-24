import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsPositive,
  Matches,
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
  @Matches(/^[a-zA-Z\s]+$/, { message: 'El campo categoria debe contener solo letras y espacios' })
  category: string; // Solo letras y espacios permitidos

  @IsNumber()
  userId: number; // para asociar el producto al usuario
}
