import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Size } from '../../size/entities/size.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 60 })
  name: string;

  @Column('varchar', { length: 3000 })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 }) 
  precio: number;

  @Column('int', { default: 0 }) 
  stock: number;

  @Column('varchar', { length: 100, nullable: true }) 
  category: string;

  @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Size, size => size.products, { cascade: true, eager: true }) // 👈 agrega eager: true
  @JoinTable()
  sizes: Size[];

}
