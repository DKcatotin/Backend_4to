import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entity/product.entity"; // ajusta ruta si es necesario

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    name: string;

    @Column('varchar', { length: 50 })
    last_name: string;

    @Column('varchar', { length: 255, nullable: true })
    descriptions: string;

    @Column('varchar', { length: 50 })
    email: string;

    @Column()
    birthday: Date;

    @Column('int')
    identificacion: number;

    @OneToMany(() => Product, product => product.user)
    products: Product[]; 
}
