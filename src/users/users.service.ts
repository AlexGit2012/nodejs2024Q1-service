import { Injectable } from '@nestjs/common';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from 'src/database/fakeUsersDatabase';
import { Errors } from 'src/errors/errors';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/types/types';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return getUsers();
  }

  getUser(id: string): User {
    return getUser(id);
  }

  createUser(dto: CreateUserDto): User {
    return createUser(dto);
  }

  updateUser(id: string, dto: UpdatePasswordDto): User | Errors {
    return updateUser(id, dto);
  }

  deleteUser(id: string) {
    deleteUser(id);
  }
}
