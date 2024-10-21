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
import { ProductModule } from './products/product.module';
import { Product } from './products/entities/product.entity';
import { OrderModule } from './orders/order.module';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'toto', 
      password: 'password', 
      database: 'userDatabase',
      entities: [User, Product, Order],
      synchronize: true, 
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule,
    JwtModule.register({
      secret: 'tu_secreto', 
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Aplica el middleware
      .forRoutes('protected-route'); //rutas que quiero proteger
  }
}


