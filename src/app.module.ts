/* eslint-disable prettier/prettier */
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from './users/entities/user.entity'; 
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Importa el JwtModule
import { JwtAuthMiddleware } from './middleware/jwt-auth.middleware'; // Asegúrate de tener la ruta correcta

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
    AuthModule,
    JwtModule.register({
      secret: 'tu_secreto', // Cambia esto a tu propio secreto
      signOptions: { expiresIn: '60s' }, // Configura el tiempo de expiración
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Aplica el middleware
      .forRoutes('protected-route'); // Cambia 'protected-route' a las rutas que deseas proteger
  }
}


