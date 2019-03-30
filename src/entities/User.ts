import {
  Entity,
  Index,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Product } from "./Product";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  firstName: string;

  @Column({ length: 256 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 256 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Product, product => product.user)
  products: Product;
}
