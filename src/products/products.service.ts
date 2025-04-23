// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'; // asegúrate que esté bien importado

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 👈 importante para la relación
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['user'] });
  }

  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['user'] });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async insert(body: any): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: body.userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${body.userId} no encontrado`);
    }

    const product = this.productRepository.create({
      name: body.name,
      description: body.description,
      precio: body.precio,
      stock: body.stock,
      category: body.category,
      user,
    });

    await this.productRepository.save(product);
  }

  async update(id: number, body: any): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    Object.assign(product, body);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async patch(id: number, body: any): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    Object.assign(product, body);
    await this.productRepository.save(product);
  }
}
