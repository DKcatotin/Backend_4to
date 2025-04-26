import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeInputDto } from './dto/size-input.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  
  async create(dto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(dto);
    return this.sizeRepository.save(size);
  }

  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) throw new NotFoundException(`Talla con ID ${id} no encontrada`);
    return size;
  }

  async update(id: number, dto: UpdateSizeDto): Promise<Size> {
    await this.sizeRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sizeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Talla con ID ${id} no encontrada`);
    }
  }

  
  private readonly sizeMap = {
    HOMBRE: {
      ECUADOR: { S: 'S', M: 'M', L: 'L', XL: 'XL', EGG: 'L', EEG: 'XL' },
      USA: { S: 'S', M: 'M', L: 'L', XL: 'XL' },
      EU: { '46': 'S', '48': 'M', '50': 'L', '52': 'XL' },
    },
    MUJER: {
      ECUADOR: { S: 'S', M: 'M', L: 'L', EG: 'L' },
      USA: { S: 'S', M: 'M', L: 'L' },
      EU: { '36': 'S', '38': 'M', '40': 'L' },
    },
    NIÑO: {
      ECUADOR: { T4: 'S', T6: 'M', T8: 'L' },
      USA: { '4T': 'S', '6T': 'M', '8T': 'L' },
      EU: { '104': 'S', '116': 'M', '128': 'L' },
    },
  };
  
  public async resolveSizesWithCountry(
    providedSizes: { size: string, type: string }[],
  ): Promise<Size[]> {
    const sizesToSave: Size[] = [];
  
    for (const { size, type } of providedSizes) {
      const detection = this.detectTypeAndCountry(size, type);
  
      if (!detection) {
        throw new BadRequestException(`No se pudo identificar tipo ni país para la talla "${size}"`);
      }
  
      const { type: detectedType, country } = detection;
      const standardizedSize = this.sizeMap[detectedType][country][size];
  
      const equivalents = Object.entries(this.sizeMap[detectedType] as Record<string, Record<string, string>>)
        .map(([countryKey, mapping]) => {
          const sizeEntry = Object.entries(mapping).find(([k, v]) => v === standardizedSize);
          return sizeEntry ? { country: countryKey, size: sizeEntry[0], type: detectedType } : null;
        })
        .filter((e): e is { country: string; size: string; type: string } => e !== null);
  
      for (const { country, size: countrySize, type } of equivalents) {
        let existing = await this.sizeRepository.findOne({ where: { size: countrySize, country, type } });
        if (!existing) {
          existing = this.sizeRepository.create({ size: countrySize, country, type });
          await this.sizeRepository.save(existing);
        }
        sizesToSave.push(existing);
      }
    }
  
    return sizesToSave;
  }
  
  private detectTypeAndCountry(size: string, providedType: string): { type: string; country: string } | null {
    
    if (providedType) {
      
      if (this.sizeMap[providedType]) {
        const countries = this.sizeMap[providedType] as Record<string, Record<string, string>>; // Agregamos el tipo explícito
  
        
        for (const [countryKey, sizesMap] of Object.entries(countries)) {
         
          if (size in sizesMap) {
            return { type: providedType, country: countryKey };
          }
        }
      }
      return null;
    }
  
   
    for (const [typeKey, countries] of Object.entries(this.sizeMap)) {
      const countryMap = countries as Record<string, Record<string, string>>; 
      for (const [countryKey, sizesMap] of Object.entries(countryMap)) {
        if (size in sizesMap) {
          return { type: typeKey, country: countryKey };
        }
      }
    }
    return null;
  }
}
