import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 60 })
  name: string;

  @Column('varchar', { length: 3000 })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 }) // precio con decimales
  precio: number;

  @Column('int', { default: 0 }) // nuevo campo: stock
  stock: number;

  @Column('varchar', { length: 100, nullable: true }) // nuevo campo: category
  category: string;

  @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
  user: User;
}
