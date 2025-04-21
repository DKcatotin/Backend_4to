import {Injectable,BadRequestException,NotFoundException,} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagPatchDto } from './dto/tag.dto/tag-patch.dto';

@Injectable()
export class TagsService {
  private tags: TagDto[] = [];

  getId(id: string): TagDto {
    const tag = this.tags.find((tag) => tag.id === id);
    if (!tag) {
      throw new NotFoundException(`No existe ningún tag con id: ${id}`);
    }
    return tag;
  }

  getAll(): TagDto[] {
    return this.tags;
  }

  async insert(tagDto: TagDto): Promise<TagDto> {
    
    const newTag: TagDto = {
      id: uuidv4(),
      name: tagDto.name,
      description: tagDto.description,
      slug: tagDto.slug,
    };

    this.tags.push(newTag);
    return Promise.resolve(newTag);
  }

  getBySlug(slug: string): TagDto[] {
    const matches = this.tags.filter((tag) => tag.slug === slug);
    if (!matches.length) {
      throw new NotFoundException(`No se encontraron tags con slug: ${slug}`);
    }
    return matches;
  }

  update(id: string, tagDto: TagDto): TagDto {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new NotFoundException(`No existe ningún tag con id: ${id}`);
    }

    

    const updatedTag: TagDto = {
      id,
      name: tagDto.name,
      description: tagDto.description,
      slug: tagDto.slug,
    };

    this.tags[index] = updatedTag;
    return updatedTag;
  }

  patch(id: string, body: TagPatchDto): TagDto {
    const previousTagDto = this.getId(id);

    const updatedTag: TagDto = {
      ...previousTagDto,
      ...body,
    };

    this.tags = this.tags.map((item) =>
      item.id === id ? updatedTag : item,
    );

    return updatedTag;
  }

  delete(id: string) {
    const tagIndex = this.tags.findIndex((tag) => tag.id === id);
    if (tagIndex === -1) {
      throw new NotFoundException(`No existe ningún tag con id: ${id}`);
    }

    this.tags.splice(tagIndex, 1);

    return { message: `Tag con id ${id} eliminado correctamente.` };
  }
}
