import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userEntity: Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userEntity.create({
      email: createUserDto.email,
      name: createUserDto.name
    })
    await this.userEntity.save(newUser)
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userEntity.find()
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userEntity.findOneBy({id})
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userEntity.update({id}, {
      email: updateUserDto?.email,
      name: updateUserDto?.name
    })
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userEntity.delete({id})
    return `This action removes a #${id} user`;
  }
}
