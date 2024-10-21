/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Endpoint para crear un nuevo usuario
    @Post()
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.usersService.create(user);
    }
    
    // Endpoint para obtener todos los usuarios
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    // Endpoint para obtener un usuario por ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const userId = parseInt(id); // Convierte el ID a número
        return this.usersService.findById(userId);
    }

    // Endpoint para actualizar un usuario
    async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
        const userId = parseInt(id); // Convierte el ID a número
        return this.usersService.update(userId, userData);
    }

    // Endpoint para eliminar un usuario
    async remove(@Param('id') id: string): Promise<void> {
        const userId = parseInt(id); // Convierte el ID a número
        return this.usersService.remove(userId);
    }
}
