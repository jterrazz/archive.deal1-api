import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { Tag } from "./Tag";
import { Store } from "./Store";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 256, nullable: true })
  description: string;

  @ManyToMany(() => Tag)
  tags: Tag[];

  @ManyToOne(() => Store, store => store.products) // TODO Connect to store
  @JoinColumn()
  store: Store;

  @Column("int", { nullable: true })
  storeId: number;
}
