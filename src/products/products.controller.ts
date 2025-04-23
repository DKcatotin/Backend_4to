import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto/product.dto';
import { ProductPatchDto } from './dto/product.dto/product-patch.dto';
import { Product } from './entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService:ProductsService){}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.productService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(
    @Body() body,
  ) {
    this.productService.insert(body);
  }
  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() body,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.productService.delete(id);
  }
  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductPatchDto,
  ) {
    return this.productService.patch(+id, body);
  }

}
