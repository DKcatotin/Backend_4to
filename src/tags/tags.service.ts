import { Injectable } from '@nestjs/common';

import { TagDto } from './dto/tag.dto/tag.dto';

@Injectable()
export class TagsService {
  private tags: TagDto[] = [];

  // getId(id: number): Tag {
  //   return this.tags.find((item: Tag) => item.id === id);
  // }

  insert(tagDto: TagDto) {
    // Aquí puedes convertir el DTO a tu modelo interno si lo necesitas
    const newTag: TagDto= {
     
      name: tagDto.name,
      description: tagDto.description,
      stock: tagDto.stock,
    };
    this.tags.push(newTag);
  }
}
