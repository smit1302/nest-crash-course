import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Smit', email: 'smitjchoksi28@gmail.com' },
    { username: 'Jhanvi', email: 'jhanvi0912@gmail.com' },
    { username: 'Heet', email: 'Geet23@gmail.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }
  fetchUserById(id: number) {
    return { id, username: 'Smit', email: 'smit1302@gmail.com' };
  }
}
