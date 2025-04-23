import { Module } from '@nestjs/common';
import{ProductsController}from './products.controller'
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product,User]),UsersModule],
    controllers:[ProductsController],
    providers:[ProductsService],
    exports: [ProductsService],
})

export class ProductsModule {

}

