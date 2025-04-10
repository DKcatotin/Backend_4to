import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

@Injectable()
export class ProductsService {
    private products : Product[] = [
        {
            id:0,
            name: "marco de fotos pequeño",
            description: "Marco ideal para fotos 15x15"
        },{
            id:1,
            name: "marco de fotos mediano",
            description: "Marco ideal para fotos 25X25"
        },{ 
            id:2,
            name: "marco de fotos grande",
            description: "Marco ideal para fotos 35x25"
        },{
            id:3,
            name: "marco de fotos granades",
            description: "Marco ideal para fotos 45x35"
        },{
            id:4,
            name:"marco semi grande",
            description:"muy largo"
        }
    ];
    getAll(){
        return this.products;
    }
    getId(id: number): Product {
        return this.products.find( (item: Product) => item.id == id);
      }
    
      insert(body: any) {
        this.products = [
          ...this.products,
          {
            id: this.lastId() + 1,
            name: body.name,
            description: body.description,
          }
        ];
      }
      update(id: number, body: any) {
        let product: Product = {
          id,
          name: body.name,
          description: body.description,
        }
        this.products = this.products.map( (item: Product) => {
          console.log(item, id, item.id == id);
          return item.id == id ? product : item;
        });
      }
    
      delete(id: number) {
        this.products = this.products.filter( (item: Product) => item.id != id );
      }
      private lastId(): number {
        return this.products[this.products.length - 1].id;
      }
}
