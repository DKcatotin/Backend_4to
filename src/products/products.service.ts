import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { FindOptionsWhere, ILike, Like, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Size } from '../size/entities/size.entity';
import { ProductDto } from './dto/product.dto/product.dto';
import { SizeService } from 'src/size/size.service';
import { SizeInputDto } from 'src/size/dto/size-input.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    private readonly sizeService: SizeService, // Inyectar el servicio de Size
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['user', 'sizes'],
    });
  }
  async findAvanzada(params: { category?: string }): Promise<Product[]> {
    const where: FindOptionsWhere<Product> = {};
  
    if (params.category) {
      where.category = ILike(`%${params.category}%`); // Comparación flexible
    }
  
    return this.productRepository.find({
      where,
      relations: ['user', 'sizes'],
    });
  }  
  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user', 'sizes'],
    });

    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async insert(body: any): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: body.userId } });
    if (!user) throw new NotFoundException(`Usuario con ID ${body.userId} no encontrado`);
  
    if (!Array.isArray(body.sizes)) {
      throw new BadRequestException('sizes debe ser un array de objetos o strings');
    }
  
    // Aseguramos que cada talla tenga al menos size y type
    const formattedSizes = body.sizes.map((s: any) =>
      typeof s === 'string' ? { size: s, type: 'HOMBRE' } : s
    );
  
    const sizes = await this.sizeService['resolveSizesWithCountry'](formattedSizes);
  
    const product = this.productRepository.create({
      name: body.name,
      description: body.description,
      precio: body.precio,
      stock: body.stock,
      category: body.category,
      user,
      sizes,
    });
  
    await this.productRepository.save(product);
  }
  
  async update(id: number, productDto: ProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });
  
    if (!product) throw new NotFoundException('Producto no encontrado');
  
    if (productDto.sizes) {
      if (!Array.isArray(productDto.sizes)) {
        throw new BadRequestException('sizes debe ser un array de objetos o strings');
      }
  
      const formattedSizes = productDto.sizes.map((s: any) =>
        typeof s === 'string' ? { size: s, type: 'HOMBRE' } : s
      );
  
      const sizes = await this.sizeService['resolveSizesWithCountry'](formattedSizes);
      product.sizes = sizes;
    }
  
    product.name = productDto.name;
    product.description = productDto.description;
    product.precio = productDto.precio;
    product.stock = productDto.stock;
    product.category = productDto.category;
  
    return this.productRepository.save(product);
  }
  
  async patch(id: number, body: any): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });
  
    if (!product) throw new NotFoundException('Producto no encontrado');
  
    if (body.sizes) {
      if (!Array.isArray(body.sizes)) {
        throw new BadRequestException('sizes debe ser un array de objetos o strings');
      }
  
      const formattedSizes = body.sizes.map((s: any) =>
        typeof s === 'string' ? { size: s } : { size: s.size }
      );
      

      const sizes = await this.sizeService['resolveSizesWithCountry'](formattedSizes);
      product.sizes = sizes;
    }
  
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.precio) product.precio = body.precio;
    if (body.stock) product.stock = body.stock;
    if (body.category) product.category = body.category;
  
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

}
