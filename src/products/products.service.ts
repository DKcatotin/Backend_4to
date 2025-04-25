import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Size } from '../size/entities/size.entity';
import { ProductDto } from './dto/product.dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({
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
      throw new BadRequestException('sizes debe ser un array de IDs o nombres válidos');
    }

    const sizes = await this.resolveSizes(body.sizes);

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

  private async resolveSizes(providedSizes: (string | number)[]): Promise<Size[]> {
    const allEquivalents: Record<string, string[]> = {
      S: ['S', '36', 'M'],
      M: ['M', '38', 'G'],
      L: ['L', '40', 'EG'],
      XL: ['XL', '42', 'EEG'],
    };

    const uniqueSizes = new Set<string>();

    for (const input of providedSizes) {
      const inputStr = input.toString();
      let equivalents = allEquivalents[inputStr];
      if (!equivalents) {
        const foundKey = Object.keys(allEquivalents).find(key =>
          allEquivalents[key].includes(inputStr),
        );
        equivalents = foundKey ? allEquivalents[foundKey] : [inputStr];
      }
      for (const eq of equivalents) {
        uniqueSizes.add(eq);
      }
    }

    const finalSizes: Size[] = [];
    for (const sizeStr of uniqueSizes) {
      let size = await this.sizeRepository.findOne({ where: { size: sizeStr } });
      if (!size) {
        size = this.sizeRepository.create({ size: sizeStr });
        await this.sizeRepository.save(size);
      }
      finalSizes.push(size);
    }
    return finalSizes;
  }

  async update(id: number, productDto: ProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    if (productDto.sizes) {
      if (!Array.isArray(productDto.sizes)) {
        throw new BadRequestException('sizes debe ser un array de IDs o nombres');
      }
      const sizes = await this.resolveSizes(productDto.sizes);
      product.sizes = sizes;
    }

    product.name = productDto.name;
    product.description = productDto.description;
    product.precio = productDto.precio;
    product.stock = productDto.stock;
    product.category = productDto.category;

    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async patch(id: number, body: any): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    if (body.sizes) {
      if (!Array.isArray(body.sizes)) {
        throw new BadRequestException('sizes debe ser un array de IDs o nombres');
      }
      const sizes = await this.resolveSizes(body.sizes);
      product.sizes = sizes;
    }

    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.precio) product.precio = body.precio;
    if (body.stock) product.stock = body.stock;
    if (body.category) product.category = body.category;

    return this.productRepository.save(product);
  }
}
