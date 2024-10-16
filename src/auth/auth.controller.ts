/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto'; // Importa el DTO para registro
import { LoginUserDto } from './dto/login-user.dto'; // Importa el DTO para login

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) { // Usa el DTO de registro
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto) { // Usa el DTO de login
    return this.authService.login(loginData);
  }
}


