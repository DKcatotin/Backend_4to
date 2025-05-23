import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustumersController } from './custumers/custumers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsService } from './products/products.service';
import { CustumersService } from './custumers/custumers.service';
import { CaminoController } from './camino/camino.controller';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entity/product.entity';
import { SizeModule } from './size/size.module';
import { Size } from './size/entities/size.entity';

@Module({
  imports: [ProductsModule, TagsModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'nestjs',
    entities:[User,Product,Size],
    retryDelay:3000,
    autoLoadEntities:true,
    synchronize: true,
  }), UsersModule, SizeModule],
  controllers: [AppController, ProductsController, CustumersController, UsersController, CaminoController],
  providers: [AppService, CustumersService],
})
export class AppModule {}
