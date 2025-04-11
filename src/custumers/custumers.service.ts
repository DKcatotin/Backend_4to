import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Custumers } from './interfaces/custumers/custumers.interface';

@Injectable()
export class CustumersService {
  private custumers: Custumers[] = [
    {
      id: 0,
      name: 'Miguel',
      age: 31,
      birth: new Date('1984-05-03'),
    },
  ];

  getAll() {
    return this.custumers;
  }

  getId(id: number): Custumers {
    const customer = this.custumers.find((item: Custumers) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado.`);
    }
    return customer;
  }

  private lastId(): number {
    return this.custumers.length > 0 ? this.custumers[this.custumers.length - 1].id : 0;
  }

  insert(body: any) {
    if (!body.name || !body.age || !body.birth) {
      throw new BadRequestException('Faltan datos requeridos: name, age o birth.');
    }

    const newCustomer: Custumers = {
      id: this.lastId() + 1,
      name: body.name,
      age: body.age,
      birth: new Date(body.birth),
    };

    this.custumers = [...this.custumers, newCustomer];
    return newCustomer;
  }

  update(id: number, body: any) {
    const existing = this.custumers.find((item) => item.id === id);
    if (!existing) {
      throw new NotFoundException(`No se puede actualizar. Cliente con id ${id} no existe.`);
    }

    if (!body.name || !body.age || !body.birth) {
      throw new BadRequestException('Faltan datos para actualizar: name, age o birth.');
    }

    const updatedCustomer: Custumers = {
      id,
      name: body.name,
      age: body.age,
      birth: new Date(body.birth),
    };

    this.custumers = this.custumers.map((item: Custumers) =>
      item.id === id ? updatedCustomer : item,
    );

    return updatedCustomer;
  }

  delete(id: number) {
    const exists = this.custumers.some((item) => item.id === id);
    if (!exists) {
      throw new NotFoundException(`No se puede eliminar. Cliente con id ${id} no existe.`);
    }

    this.custumers = this.custumers.filter((item: Custumers) => item.id !== id);
    return { message: `Cliente con id ${id} eliminado correctamente.` };
  }
}
