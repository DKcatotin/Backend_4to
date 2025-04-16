import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';
import { ProductPatchDto } from './dto/product.dto/product-patch.dto';
import { ProductDto } from './dto/product.dto/product.dto';

@Injectable()
export class ProductsService {
    private products : ProductDto[] = []
    getAll(){
        return this.products;
    }
    getId(id: number): ProductDto {
        return this.products.find( (item: ProductDto) => item.id == id);
      }
    
      insert(body: any) {
        this.products = [
          ...this.products,
          {
            id: this.lastId() + 1,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
            residence:body.residence


          }
        ];
      }
      update(id: number, body: any) {
        let product: ProductDto = {
          id,
          name: body.name,
          age: body.age,
          birthday: body.birthday,
          residence:body.residence
        }
        this.products = this.products.map( (item: ProductDto) => {
          console.log(item, id, item.id == id);
          return item.id == id ? product : item;
        });
      }
    
      delete(id: number) {
        this.products = this.products.filter( (item: ProductDto) => item.id != id );
      }
      private lastId(): number {
        return this.products[this.products.length - 1].id;
      }
      patch(id: number, body: ProductPatchDto) {
          const previousTagDto = this.getId(id);
          if (!previousTagDto) return;
        
          const updatedTag: ProductDto = {
            ...previousTagDto,
            ...body,
          };
        
          this.products = this.products.map((item: ProductDto) => {
            return item.id === id ? updatedTag : item;
          });
        }
}
