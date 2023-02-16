import { Controller, Post, Body, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-user', 'create-user'];
    requestPatters.forEach(async (patter) => {
      this.client.subscribeToResponseOf(patter);
      await this.client.connect();
    });
  }

  @Get()
  findAll(): Observable<UserEntity[]> {
    return this.client.send('find-all-user', {});
  }

  @Post()
  @ApiBody({ type: UserDto })
  @ApiResponse({ type: UserDto })
  create(@Body() user: UserDto): Observable<UserEntity> {
    return this.client.send('create-user', user);
  }
}
