/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller'; // Asegúrate de importar el controlador
import { JwtStrategy } from './jwt.strategy'; // Asegúrate de importar tu estrategia JWT


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por una clave más segura
      signOptions: { expiresIn: '60s' }, // Tiempo de expiración del token
    }),
  ],
  providers: [AuthService, JwtStrategy], // Agrega JwtStrategy aquí
  controllers: [AuthController], // Agrega el controlador aquí
  exports: [AuthService],
})
export class AuthModule {}
