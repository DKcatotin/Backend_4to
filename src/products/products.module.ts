import { forwardRef, Module } from '@nestjs/common';
import{ProductsController}from './products.controller'
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Size } from 'src/size/entities/size.entity';
import { SizeModule } from 'src/size/size.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product,User, Size]),UsersModule, forwardRef(() => SizeModule)],
    controllers:[ProductsController],
    providers:[ProductsService],
    exports: [ProductsService],
})

export class ProductsModule {

}

