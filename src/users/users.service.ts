/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // Método para crear un nuevo usuario
    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    // Método para obtener todos los usuarios
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Método para encontrar un usuario por ID
    async findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    // Método para actualizar un usuario
    async update(id: number, userData: Partial<User>): Promise<User> {
        await this.userRepository.update(id, userData);
        return this.findOne(id);
    }

    // Método para eliminar un usuario
    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

