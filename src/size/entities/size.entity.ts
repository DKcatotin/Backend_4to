import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";  // Cambié PrimaryColumn por PrimaryGeneratedColumn
import { Product } from "../../products/entity/product.entity";
import { IsNotEmpty } from "class-validator";

@Entity() 
export class Size {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    @IsNotEmpty()
    country: string;
  
    @Column()
    @IsNotEmpty()
    size: string;
  
    @Column()
    @IsNotEmpty()
    type: string;
    
    @ManyToMany(() => Product, product => product.sizes)
    products: Product[];
}
