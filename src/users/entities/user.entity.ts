/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('users') 
export class User {
    @PrimaryGeneratedColumn() 
    id!: number; 

    @Column({ length: 20, nullable: false })
    username!: string;

    @Column({ length: 60, nullable: false }) 
    password!: string;

    @Column({ unique: true, nullable: false }) 
    email!: string;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];

}
