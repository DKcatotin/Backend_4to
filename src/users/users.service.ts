import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
){}
 

  findAll():Promise <User[]>{
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['products'], 
    });
  
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
  
    return user;
  }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
  const user =this.userRepository.create(createUserDto);
  return await this.userRepository.save(user)
    
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
  
    Object.assign(user, updateUserDto);
  
    return await this.userRepository.save(user);
  }
  

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
  
    await this.userRepository.remove(user);
  }
  
  async updateComplete(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
  
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
  
    const requiredFields = ['name', 'last_name', 'descriptions', 'email', 'birthday', 'identificacion'];
    const missingFields = requiredFields.filter(field => updateUserDto[field] === undefined);
  
    if (missingFields.length > 0) {
      console.warn('Faltan los siguientes campos:', missingFields); 
      throw new BadRequestException(`Faltan los siguientes campos requeridos: ${missingFields.join(', ')}`);
    }
  
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
}
