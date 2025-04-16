import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAllTags(): TagDto[] {
    return this.tagsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): TagDto {
    return this.tagsService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createTag(@Body() tagDto: TagDto) {
    this.tagsService.insert(tagDto);
    return { message: 'Agregado correctamente' };
  }
}
