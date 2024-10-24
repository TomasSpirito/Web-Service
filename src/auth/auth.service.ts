/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'; 

export interface RegisterResponse {
  message: string;
  username: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(userData: CreateUserDto): Promise<RegisterResponse> {
    // Verificar si el usuario ya existe por correo electrónico
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con este correo electrónico');
    }

    const hashedPassword = await this.hashPassword(userData.password);

    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      message: '¡Registro Exitoso!',
      username: newUser.username,
    };
  } 

  // Método para iniciar sesión // login anterior
  // async login(loginData: LoginUserDto): Promise<{ access_token: string }> {
  //   // Aquí buscamos al usuario usando el correo o el nombre de usuario
  //   const user = await this.usersService.findByEmail(loginData.email);
    
  //   if (!user || !(await this.validatePassword(loginData.password, user.password))) {
  //     throw new UnauthorizedException('Correo electrónico o contraseña inválidos');
  //   }

  //   const token = this.jwtService.sign({ email: user.email, id: user.id });
  //   return { access_token: token };
  // }

//login nuevo
async login({email, password}:LoginUserDto) {
  const user = await this.usersService.findByEmail(email);

  if(!user) {
    throw new UnauthorizedException('Correo electrónico invalido');
  }

  const isPasswordValid = await bcryptjs.compare(password,user.password);

  if(!isPasswordValid) {
    throw new UnauthorizedException('Contraseña invalida');
  }

  const payload = { email: user.email};

  const token = await this.jwtService.signAsync(payload);
  return { 
    message: '¡Login exitoso!',
    access_token: token
  }

}

  // Método privado para hashear contraseñas
  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  // Método privado para validar contraseñas
  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

}
