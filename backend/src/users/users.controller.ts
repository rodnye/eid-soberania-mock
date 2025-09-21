import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    if (typeof req['user_cid'] !== 'string') {
      throw new HttpException('Invalid user data', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(req['user_cid']);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
