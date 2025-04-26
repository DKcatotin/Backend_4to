import { IsNotEmpty, IsEnum } from 'class-validator';

export class SizeInputDto {
  @IsNotEmpty()
  @IsEnum(['ECUADOR', 'USA', 'EU']) 
  country: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  @IsEnum(['HOMBRE', 'MUJER', 'NIÑO'])
  type: string;
}
