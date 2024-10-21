/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('pedidos')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Ruta para crear un pedido
  @Post()
  async createOrder(@Body() orderData: { userId: number; productIds: number[] }): Promise<Order> {
    try {
      return await this.orderService.create(orderData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al crear el pedido:', error.message); 
      } else {
        console.error('Error desconocido al crear el pedido:', error); 
      }
      throw error; 
    }
  }

  // Ruta para listar todos los pedidos
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
