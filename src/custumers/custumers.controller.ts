import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CustumersService } from './custumers.service';
import { Custumers } from './interfaces/custumers/custumers.interface';

@Controller('custumers')
export class CustumersController {
    constructor(private readonly custumerService: CustumersService){}

    @Get('ruta-error')
        @HttpCode(HttpStatus.NOT_FOUND)
        rutaConError404(){
        return 'esto es un error 404!! no existe';
        //http://localhost:3000/custumers/ruta-error
    }
    @Get()
      getAllCustumers():Custumers[] {
        return this.custumerService.getAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id) {
        return this.custumerService.getId(+id);
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
        return this.custumerService.update(+id, body);
      }
      @Patch(':id')
    partialUpdate(@Param('id') id: number, @Body() body) {
        return this.custumerService.partialUpdate(+id, body);
    }
    
      @Delete(':id')
      @HttpCode(HttpStatus.NO_CONTENT)
      delete(@Param('id') id: number) {
        this.custumerService.delete(+id);
      }
    
}
