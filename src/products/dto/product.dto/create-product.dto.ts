import { IsNotEmpty } from "class-validator";

export class CreateProduct{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description:string
    @IsNotEmpty()
    precio:number

    
}