/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'; // Cambiado a bcryptjs

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Método para crear un nuevo usuario
  async create(user: Partial<User>): Promise<User> {
    // Verifica que la contraseña esté presente
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    // Encripta la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(user.password, 10); // Cambia la sal a un valor fijo o un número
    user.password = hashedPassword;
    
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Método para encontrar un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Método para encontrar un usuario por email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email });
    return user || undefined; // Devuelve undefined si user es null
  }

  // Método para actualizar un usuario
  async update(id: number, userData: Partial<User>): Promise<User> {
    // Verifica si el usuario existe
    await this.findOne(id); // Esto lanzará NotFoundException si el usuario no existe

    // Actualiza el usuario
    await this.userRepository.update(id, userData);
    
    return this.findOne(id); // Devuelve el usuario actualizado
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Verifica que el usuario exista
    await this.userRepository.delete(user.id);
  }
}
