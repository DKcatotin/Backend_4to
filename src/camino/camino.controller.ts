import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

@Controller('camino')
export class CaminoController {
    @Get()
    getHelloInProducts(): string {
      return "Estamos en camino...";
    }
    @Get(':id/:size')
    findWithSize(@Param('id') id: number, @Param('size') size: string ) {
    return `Página de detalle de producto ${id}, en tamaño ${size}`;
}
    //Decorador RES
    @Get(':id')
        find(@Res() response, @Param('id') id:number){
     if(id<100){
        return response.status(HttpStatus.OK).send(`Pagina del producto: ${id}`);
        }else{
     return response.status(HttpStatus.NOT_FOUND).send(`Producto con id ${id} not found`);
        }
    }
    
}
