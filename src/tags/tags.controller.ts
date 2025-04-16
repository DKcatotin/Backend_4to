import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagPatchDto } from './dto/tag.dto/tag-patch.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
   getAllTags(): TagDto[] {
     return this.tagsService.getAll();
   }

  @Get(':id')
  getId(@Param('id') id:string){
  return this.tagsService.getId(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.OK)
  // createTag(@Body() tagDto: TagDto) {
  //   this.tagsService.insert(tagDto);
  //   return { message: 'Agregado correctamente' };
  // }
  @Post()
  @UsePipes(new ValidationPipe())
  async insert(@Body() body: TagDto): Promise<TagDto> {
  return this.tagsService.insert(body);
  }

// @Patch(':id')
// async patch(
//   @Param('id', ParseIntPipe) id: number,
//   @Body() body: TagPatchDto,
// ) {
//   return this.tagsService.patch(+id, body);
// }
}
