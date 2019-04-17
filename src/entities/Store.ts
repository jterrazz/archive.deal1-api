import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable
} from "typeorm";

import { Tag } from "./Tag";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256, nullable: true })
  description: string;

  @Column({ length: 256 })
  profileImageId: string;

  @Column({ length: 256 })
  bannerImageId: string;

  @OneToMany(() => Product, product => product.store)
  products: Product;

  @ManyToMany(() => User)
  @JoinTable({ name: "user_stores" })
  users: User[];

  @ManyToMany(() => Tag)
  tags: Tag[];
}
