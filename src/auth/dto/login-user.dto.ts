/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
