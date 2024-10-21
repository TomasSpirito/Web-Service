/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { Product } from '../../products/entities/product.entity';//+


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.orders)
  user!: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];

  @CreateDateColumn()
  orderDate!: Date;
}
