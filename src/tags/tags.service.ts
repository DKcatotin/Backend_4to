import { Injectable, Patch } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagPatchDto } from './dto/tag.dto/tag-patch.dto';
import { NotFoundException } from '@nestjs/common'; 

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
    slug:tagDto.slug
  };
  this.tags.push(newTag);
  return Promise.resolve(newTag); 
}
getBySlug(slug: string): TagDto[] {
  return this.tags.filter(tag => tag.slug === slug);
}
update(id: string, tagDto: TagDto): TagDto {
  const index = this.tags.findIndex(tag => tag.id === id);

  if (index === -1) {
    throw new NotFoundException('Tag not found');
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

  this.tags = this.tags.map((item: TagDto) =>
    item.id === id ? updatedTag : item,
  );

  return updatedTag;
}

  delete(id: string){
    const tag = this.tags.find(tag => tag.id === id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
      }
      this.tags = this.tags.filter(tag => tag.id !== id);
      return {message: `Tag con id${id} eliminado correctamente`}
  }
  
}
