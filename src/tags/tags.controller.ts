import {Body,Controller,Delete,Get,HttpCode,HttpStatus,Param,ParseIntPipe,Patch,Post,Put,UseGuards,UsePipes,ValidationPipe,} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagPatchDto } from './dto/tag.dto/tag-patch.dto';

// import { AuthGuard } from '@nestjs/passport';


@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
   getAllTags(): TagDto[] {
     return this.tagsService.getAll();
   }
  //  @UseGuards(AuthGuard('jwt')) 
  @Get(':id')
  getId(@Param('id') id:string){
  return this.tagsService.getId(id);
  }
  @Get('slug/:slag')
  getBySlug(@Param('slag') slag: string): TagDto[] {
    return this.tagsService.getBySlug(slag);
  }  
  
  @Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
create(@Body() body: TagDto): Promise<TagDto> {
  return this.tagsService.insert(body);
}

 @Patch(':id')
async patch(
  @Param('id') id: string,
 @Body() body: TagPatchDto,
 ) {
  return this.tagsService.patch(id, body);
}
@Put(':id')
update(@Param('id') id: string, @Body() body: TagDto): TagDto {
  return this.tagsService.update(id, body);
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.tagsService.delete(id);
}

}
