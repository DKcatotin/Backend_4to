import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagPatchDto } from './dto/tag.dto/tag-patch.dto';

@Injectable()
export class TagsService {
  private tags: TagDto[] = [];

 getId(id: string) :TagDto{
 const tag = this.tags.find(tag => tag.id === id);
 if (!tag) {
  throw new Error('Tag not found');
}
return tag
}
getAll() {return this.tags;
 }

async insert(tagDto: TagDto): Promise<TagDto> {
  const newTag: TagDto = {
    id: uuidv4(), 
    name: tagDto.name,
    description: tagDto.description,
    slag:tagDto.slag
  };
  this.tags.push(newTag);
  return Promise.resolve(newTag); 
}
  }
  // patch(id: number, body: TagPatchDto) {
  //   const previousTagDto = this.getId(id);
  //   if (!previousTagDto) return;
  
  //   const updatedTag: TagDto = {
  //     ...previousTagDto,
  //     ...body,
  //   };
  
  //   this.tags = this.tags.map((item: TagDto) => {
  //     return item.id === id ? updatedTag : item;
  //   });
  // }

