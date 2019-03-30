import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { User } from "./User";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 256, nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.products)
  @JoinColumn()
  user: User;

  @Column("int", { nullable: true })
  userId: number;
}
