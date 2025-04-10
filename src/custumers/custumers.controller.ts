import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CustumersService } from './custumers.service';
import { Custumers } from './interfaces/custumers/custumers.interface';

@Controller('custumers')
export class CustumersController {
    constructor(private readonly custumerService: CustumersService){}

    // @Get('query')
    //     rutaQuery(@Query() query) {
    //     return `El dato query, x ha resivido el valor ${query.x} y el valor de y es ${query.y} `;
    // }

    @Get('ruta-error-404')
        @HttpCode(HttpStatus.NOT_FOUND)
        rutaConError404(){
        return 'esto es un error 404!! no existe';
    }
    @Get()
      getAllCustumers():Custumers[] {
        return this.custumerService.getAll();
      }
    
      @Get(':id')
      find(@Param('id') id: number) {
        return this.custumerService.getId(id);
      }
    
      @Post()
      @HttpCode(HttpStatus.NO_CONTENT)
      createCustumCustumers(
        @Body() body,
      ) {
        this.custumerService.insert(body);
      }
      @Put(':id')
      update(
        @Param('id') id: number, 
        @Body() body,
      ) {
        return this.custumerService.update(id, body);
      }
    
      @Delete(':id')
      @HttpCode(HttpStatus.NO_CONTENT)
      delete(@Param('id') id: number) {
        this.custumerService.delete(id);
      }
    
}
