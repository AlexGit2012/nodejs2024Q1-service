import { isUUID } from 'class-validator';
import { Errors } from 'src/errors/errors';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/types/types';
import { filterObjFields } from 'src/utils/utils';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export const getUsers = (): User[] => users;

export const setUsers = (newUsers: User[]) => {
  users = newUsers;
};

export const findUser = (id: string) => {
  if (isUUID(id)) {
    return Errors.INVALID_UUID;
  }
  const user = getUsers().find((user) => user.id === id);
  return user;
};

export const findUserByLogin = (login: string) => {
  const user = getUsers().find((user) => user.login === login);
  return user;
};

export const createUser = (dto: CreateUserDto) => {
  const { password, login } = dto;

  const user: User = {
    id: uuidv4(),
    login,
    password,
    version: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
  setUsers([...getUsers(), user]);
  return filterObjFields(user, 'password') as User;
};

export const getUser = (id: string) => {
  return getUsers().find((user: User) => user.id === id);
};

export const updateUser = (id: string, dto: UpdatePasswordDto) => {
  const user = getUser(id);
  if (user.password !== dto.oldPassword) {
    return Errors.INVALID_OLD_PASSWORD;
  }
  user.password = dto.newPassword;
  user.updatedAt = new Date().getTime();
  user.version += 1;
  return filterObjFields(getUser(id), 'password') as User;
};

export const deleteUser = (id: string) => {
  const newUsersArr = getUsers().filter((user) => user.id !== id);
  setUsers(newUsersArr);
};
