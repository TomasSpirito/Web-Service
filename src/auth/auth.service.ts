/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(userData: CreateUserDto): Promise<{ id: number; username: string; email: string }> {
    // Verificar si el usuario ya existe por correo electrónico
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con este correo electrónico');
    }

    const hashedPassword = await this.hashPassword(userData.password);
    console.log('Generated Hash (during registration):', hashedPassword);

    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return this.extractUserData(newUser);
  } 

  // Método para iniciar sesión
  async login(loginData: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginData.email);
    
    if (!user || !(await this.validatePassword(loginData.password, user.password))) {
      throw new UnauthorizedException('Correo electrónico o contraseña inválidos');
    }

    const token = this.jwtService.sign({ email: user.email, id: user.id });
    return { access_token: token };
  }

  // Método privado para hashear contraseñas
  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  // Método privado para validar contraseñas
  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

  // Método privado para extraer información del usuario
  private extractUserData(user: any): { id: number; username: string; email: string } {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}  
