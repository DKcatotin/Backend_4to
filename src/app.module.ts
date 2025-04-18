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

@Module({
  imports: [ProductsModule, TagsModule],
  controllers: [AppController, ProductsController, CustumersController, UsersController, CaminoController],
  providers: [AppService, ProductsService, CustumersService],
})
export class AppModule {}
