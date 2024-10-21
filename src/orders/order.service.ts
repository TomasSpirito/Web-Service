/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Crear un nuevo pedido
  async create(orderData: { userId: number; productIds: number[] }): Promise<Order> {
    // Verificar si el usuario existe
    const user = await this.userRepository.findOne({ where: { id: orderData.userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  
    // Verificar si hay IDs de productos
    if (orderData.productIds.length === 0) {
      throw new HttpException('Debes proporcionar al menos un ID de producto', HttpStatus.BAD_REQUEST);
    }
  
    // Obtener los productos
    const products = await this.productRepository.findBy({
      id: In(orderData.productIds),
    });
    if (products.length === 0) {
      throw new HttpException('No se encontraron productos', HttpStatus.NOT_FOUND);
    }
  
    // Crear la nueva orden
    const newOrder = this.orderRepository.create({
      user,
      products,
    });
  
    // Guardar la orden y devolver el pedido guardado
    const savedOrder = await this.orderRepository.save(newOrder);
    return savedOrder;
  }

  // Listar todos los pedidos
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['user', 'products'] });
  }
}
