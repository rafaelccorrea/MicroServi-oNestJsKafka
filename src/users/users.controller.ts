import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: UserDto })
  @ApiResponse({ type: UserDto })
  async create(@Body() user: UserDto): Promise<User> {
    return await this.usersService.create(user);
  }
}
