import { Body, Controller, Get, HttpStatus, Param, Put, Res } from '@nestjs/common';

@Controller('camino')
export class CaminoController {
    @Get(':id')
        find(@Res() response, @Param('id') id:number){
     if(id<100){
        return response.status(HttpStatus.OK).send(`Pagina del producto: ${id}`);
        }else{
     return response.status(HttpStatus.NOT_FOUND).send(`Producto con id ${id} not found`);
        }
    }
    @Put(':id')
        update(@Param('id') id:number, @Body() body){
     return `Estas haciendo una operacion del recurso ${id} con ${body.name} y ${body.description}`;
    }
}
