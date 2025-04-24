// products.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'; // asegúrate que esté bien importado
import { ProductPatchDto } from './dto/product.dto/product-patch.dto';

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

  async update(id: number, productPatchDto: ProductPatchDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {throw new NotFoundException('Producto no encontrado');}

    const requiredFields=['name','description','precio','stock','category'];
    const missingFields= requiredFields.filter(field=>productPatchDto[field]===undefined);
    if(missingFields.length > 0){
      console.warn('Faltan los siguientes campos:',missingFields);
      throw new BadRequestException(`Faltan los sigueintes campos requeridos: ${missingFields.join(', ')}`)
    }
    Object.assign(product, productPatchDto);
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
