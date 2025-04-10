import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('query')
         rutaQuery(@Query() query) {
        return `El dato query, x ha resivido el valor ${query.x} y el valor de y es ${query.y} `;
        }
    
}
