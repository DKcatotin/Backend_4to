import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";  // Cambié PrimaryColumn por PrimaryGeneratedColumn
import { Product } from "../../products/entity/product.entity";

@Entity() 
export class Size {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    size: string;
    
    @ManyToMany(() => Product, product => product.sizes)
    products: Product[];
}
