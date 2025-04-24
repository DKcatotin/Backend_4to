import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    descriptions: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    birthday: Date;
    @IsString()
    @Matches(/^\d{10}$/, {message: 'La identificación debe tener exactamente 10 números.',})
    identificacion: string; 
  }
  