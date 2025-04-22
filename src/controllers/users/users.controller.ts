import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('user')
export class UsersController {
    @Get('query')
         rutaQuery(@Query() query) {
        return `El dato query, x ha resivido el valor ${query.x} y el valor de y es ${query.y} `;
        }
    //http://localhost:3000/users/query?x=24&y=65
    @Get('cars')
        carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return carCount;
        //http://localhost:3000/users/cars?count=78.7
    }
    @Get('cars')
        carsQ(@Query('count') carCount: number) {
        return carCount;
        //http://localhost:3000/users/cars?count=24
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
