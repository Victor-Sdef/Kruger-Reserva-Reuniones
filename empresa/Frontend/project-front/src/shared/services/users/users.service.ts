import { httpClient } from '../http-client';
import { User } from './types';

const BASE_URL = '/users';

export const UserService = {
  getUsers: () =>
    httpClient.get<User[]>(BASE_URL),

  getUser: (id: number) =>
    httpClient.get<User>(`${BASE_URL}/${id}`),
};
