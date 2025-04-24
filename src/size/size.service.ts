import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}
  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return this.sizeRepository.save(size);
  }
  

  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find({ relations: ['products'] }); 
  }
  

  async findOne(id: number): Promise<Size> {
    return this.sizeRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }
  

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    await this.sizeRepository.update(id, updateSizeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sizeRepository.delete(id);
  }
}
