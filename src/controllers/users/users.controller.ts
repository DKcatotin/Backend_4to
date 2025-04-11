import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('query')
         rutaQuery(@Query() query) {
        return `El dato query, x ha resivido el valor ${query.x} y el valor de y es ${query.y} `;
        }
    //query?x=24&y=xxx
    @Get('cars')
        carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return carCount;
    }
    @Get('cars')
        carsQ(@Query('count') carCount: number) {
        return carCount;
    } 
    @Get() 
        getALL(){
            return "lista de usuarios"
        }
     
    @Post()
    createProduct(
        @Body('name') name: string, 
        @Body('des') des: string
    ) {
        return `Creo el producto ${name} con descripción ${des}.`;
    }
    //http://localhost:3000/users
    // {
    //     "name":"jorge",
    //     "des": "muy alto"
    // }
    @Put(':id')
        update(@Param('id') id:number, @Body() body){
     return `Estas haciendo una operacion del recurso ${id} con ${body.name} y ${body.des}`;
    }

    @Patch(':id')
        partialUpdate(@Param('id') id: number, @Body() body) {
        return `Actualización parcial del ítem ${id}`;
    }
    @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id') id: number) {
        return `Hemos borrado el producto ${id}`;
    }
    // http://localhost:3000/users/1
}
