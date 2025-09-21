import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';

const usersMock: UserDto[] = [
  {
    cid: '99010112345',
    phone: '+5351234567',
    email: 'juan.perez@nauta.cu',
    password: '1234',
    fullname: 'Juan Pérez García',
    address: 'Calle 23 #456 e/ 12 y 14, Vedado, La Habana',
  },
  {
    cid: '85051554321',
    phone: '+5378765432',
    email: 'maria.gonzalez@infomed.sld.cu',
    password: '1234',
    fullname: 'María González López',
    address: 'Avenida de los Presidentes #123, Plaza, La Habana',
  },
  {
    cid: '00123098765',
    phone: '+5345678901',
    email: 'carlos.rodriguez@uho.edu.cu',
    password: '1234',
    fullname: 'Carlos Rodríguez Martínez',
    address: 'Calle 10 #789, Centro Habana, La Habana',
  },
];

@Injectable()
export class UsersService {
  findAll(): UserDto[] {
    return usersMock;
  }

  findOne(cid: string): UserDto | undefined {
    return usersMock.find((user) => user.cid === cid);
  }

  findByEmail(email: string): UserDto | undefined {
    return usersMock.find((user) => user.email === email);
  }

  create(user: UserDto): UserDto {
    usersMock.push(user);
    return user;
  }

  verifyPassword(cid: string, password: string): boolean {
    const user = this.findOne(cid);
    return user ? user.password === password : false;
  }

  updatePassword(
    cid: string,
    oldPassword: string,
    newPassword: string,
  ): boolean {
    const userIndex = usersMock.findIndex((user) => user.cid === cid);
    if (userIndex === -1 || usersMock[userIndex].password !== oldPassword) {
      return false;
    }
    usersMock[userIndex].password = newPassword;
    return true;
  }
}
