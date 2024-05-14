import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dtos/create_user.dto';
import { User } from '../entities/users.entity';
import { UpdateUserDTO } from '../dtos/update_user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  create(@Body() userPayload: CreateUserDTO): Promise<User> {
    return this.userService.create(userPayload);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPayload: UpdateUserDTO,
  ): Promise<void> {
    return this.userService.update(id, userPayload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
