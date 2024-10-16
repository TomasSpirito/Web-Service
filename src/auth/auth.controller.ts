/* eslint-disable prettier/prettier */
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto'; 
import { LoginUserDto } from './dto/login-user.dto'; 
import { AuthGuard } from '@nestjs/passport'; 
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

  // Ruta protegida
  @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  async getProfile() { 
    return { message: "Estás dentro" }; 
  }


}
