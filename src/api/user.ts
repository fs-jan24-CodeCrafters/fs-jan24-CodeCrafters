import { CreateUserRequest, User } from '../types/User';
import { client } from '../helpers/fetchClient';

export const createUser = (user: CreateUserRequest) => {
  return client.post<User>('/api/auth/register', user);
};

export const loginUser = (user: CreateUserRequest) => {
  return client.post<User>('/api/auth/login', user);
};
