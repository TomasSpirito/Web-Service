/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') 
export class User {
    @PrimaryGeneratedColumn() 
    id!: number; 

    @Column({ length: 20, nullable: false })
    username: string;

    @Column({ length: 60, nullable: false }) 
    password: string;

    @Column({ unique: true, nullable: false }) 
    email: string;

    constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
