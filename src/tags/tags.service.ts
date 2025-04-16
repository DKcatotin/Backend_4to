import { Injectable } from '@nestjs/common';

import { TagDto } from './dto/tag.dto/tag.dto';

@Injectable()
export class TagsService {
  private tags: TagDto[] = [];

  getId(id: number): TagDto {
  return this.tags.find((item: TagDto) => item.id === id);
 }
 getAll() {
  return this.tags;
}
 private lastId(): number {
  return this.tags.length > 0 ? this.tags[this.tags.length - 1].id : 0;
}
  insert(tagDto: TagDto) {
    // Aquí puedes convertir el DTO a tu modelo interno si lo necesitas
    const newTag: TagDto= {
      id: this.lastId() + 1,
      name: tagDto.name,
      age: tagDto.age,
      birthday: tagDto.birthday,
    };
    this.tags.push(newTag);
  }
}
