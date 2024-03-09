import { Injectable } from '@nestjs/common';
import { User } from 'src/types/types';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return [];
  }
}
