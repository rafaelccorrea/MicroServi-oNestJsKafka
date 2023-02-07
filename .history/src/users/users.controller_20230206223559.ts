import { Controller, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  @Post()
  async create(user: User): User {
    return await this.usersService.create(user);
  }
}
