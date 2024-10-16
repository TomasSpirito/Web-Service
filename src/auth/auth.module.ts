import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller'; // Asegúrate de importar el controlador

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por una clave más segura
      signOptions: { expiresIn: '60s' }, // Tiempo de expiración del token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController], // Agrega el controlador aquí
  exports: [AuthService],
})
export class AuthModule {}
