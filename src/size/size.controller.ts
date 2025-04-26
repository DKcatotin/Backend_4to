import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeInputDto } from './dto/size-input.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async create(@Body() sizeInputDto: SizeInputDto): Promise<void> {
    await this.sizeService.resolveSizesWithCountry([sizeInputDto]);

  }
  @Post('resolve')
  async resolveSize(@Body() input: SizeInputDto) {
    return this.sizeService.resolveSizesWithCountry([input]);
  }

  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(+id);
  }

 
  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizeService.update(+id, updateSizeDto);
  }

  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizeService.update(+id, updateSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeService.remove(+id);
  }
}
