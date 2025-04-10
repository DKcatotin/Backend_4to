import { Injectable } from '@nestjs/common';
import { Custumers } from './interfaces/custumers/custumers.interface';

@Injectable()
export class CustumersService {
    private custumers : Custumers [] =[

            { id:0,
            name:"Miguel",
            age:31,
            birth:new Date('1984-05-03')}
    
    ];
    getAll(){
            return this.custumers;
        }
        getId(id: number): Custumers {
            return this.custumers.find( (item: Custumers) => item.id == id);
          }
    private lastId(): number {
        return this.custumers[this.custumers.length - 1].id;
      }
      insert(body: any) {
              this.custumers = [
                ...this.custumers,
                {
                 id: this.lastId() + 1,
                 name: body.name,
                 age: body.age,
                 birth: body.birth
                }
              ];
            }
            update(id: number, body: any) {
              let custumers: Custumers = {
                id,
                name: body.name,
                age: body.age,
                birth: body.birth
              }
              this.custumers = this.custumers.map( (item: Custumers) => {
                console.log(item, id, item.id == id);
                return item.id == id ? custumers : item;
              });
            }
          
            delete(id: number) {
              this.custumers = this.custumers.filter( (item: Custumers) => item.id != id );
            }
}
