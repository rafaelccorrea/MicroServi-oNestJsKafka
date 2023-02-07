import { IsString } from '@nestjs/class-validator';

export interface User {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  phone: string

  @IsString()
  password: string
}
