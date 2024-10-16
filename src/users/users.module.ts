import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // Asegúrate de importar la entidad User

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra la entidad User
  ],
  providers: [UsersService], // Proporciona el UsersService a este módulo
  controllers: [UsersController], // Registra el UsersController para manejar las rutas
})
export class UsersModule {}
