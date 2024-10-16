/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
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
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findById(id);
    }

    // Endpoint para actualizar un usuario
    @Patch(':id')
    async update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
        return this.usersService.update(id, userData);
    }

    // Endpoint para eliminar un usuario
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
