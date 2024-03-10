import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/types/types';
import { Errors } from 'src/errors/errors';
import { isUUID } from 'class-validator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get('/user/:id')
  getUser(@Param('id') id: string): User {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const user = this.usersService.getUser(id);
    if (!user) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post('/user')
  @UsePipes(new ValidationPipe())
  createUser(@Body() dto: CreateUserDto): User {
    return this.usersService.createUser(dto);
  }

  @Put('/user/:id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const user = this.usersService.getUser(id);
    if (!user) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    const updatedUser = this.usersService.updateUser(id, dto);

    if (updatedUser === Errors.INVALID_OLD_PASSWORD) {
      throw new HttpException(
        Errors.INVALID_OLD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }
    return updatedUser;
  }

  @Delete('/user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(Errors.INVALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const user = this.usersService.getUser(id);
    if (!user) {
      throw new HttpException(Errors.NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    this.usersService.deleteUser(id);
  }
}
