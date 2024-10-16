/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, nullable: false })
    username: string;

    @Column({ length: 60, nullable: false }) // Longitud de contraseña
    password: string;

    @Column({ unique: true, nullable: false }) // Email único
    email: string;
}

