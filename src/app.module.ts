/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from './users/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto a 'database' si el contenedor de Docker y tu app están en la misma red
      port: 5432,
      username: 'toto', // Cambia el usuario según tu configuración
      password: 'password', // Cambia la contraseña según tu configuración
      database: 'userDatabase',
      entities: [User],
      synchronize: true, 
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
