/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Ruta para crear un producto
  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  // Ruta para listar todos los productos
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
