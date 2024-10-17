/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Método para encontrar un usuario por ID
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Método para crear un nuevo usuario
  async create(user: Partial<User>): Promise<User> {
    // Verifica que la contraseña esté presente
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Método para encontrar un usuario por email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email });
    return user || undefined; // Devuelve undefined si user es null
  }

  // Método para actualizar un usuario
  async update(id: number, userData: Partial<User>): Promise<User> {
    // Verifica si el usuario existe
    await this.findById(id); 

    // Actualiza el usuario
    await this.userRepository.update(id, userData);
    return this.findById(id); 
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.findById(id); // Verifica que el usuario exista
    await this.userRepository.delete(user.id);
  }
}
