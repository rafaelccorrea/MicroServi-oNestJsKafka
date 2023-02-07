/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from '@nestjs/class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
