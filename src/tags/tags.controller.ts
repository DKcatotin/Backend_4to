import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto/tag.dto';
@Controller('tags')
export class TagsController {
    constructor (private readonly tagsService: TagsService) {}

// @Get(':id')
// async find(@Param('id', ParseIntPipe) id: number) {
//   return `La pagina con ${id} existe `+this.tagsService.getId(id)
//   ;
// }
 @Post()
 @HttpCode(HttpStatus.OK)
 createProduct(
  @Body() tagtDto: TagDto,
 ) {   this.tagsService.insert(tagtDto);
  return {message: 'Agregado correctamente'}
}
}
