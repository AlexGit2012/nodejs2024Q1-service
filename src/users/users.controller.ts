import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/types/types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  getHello(): User[] {
    return this.usersService.getUsers();
  }
}
