import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/create_user.dto';
import { UpdateUserDTO } from '../dtos/update_user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(createUserDTO);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByPhone(phone: string): Promise<User> {
    return this.usersRepository.findOneBy({ phone });
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<void> {
    await this.usersRepository.update(id, updateUserDTO);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
