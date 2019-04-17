import { Entity, Index, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

import { Store } from "./Store";
import { Product } from "./Product";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: "tag_products" })
  products: Product[];

  @ManyToMany(() => Store)
  @JoinTable({ name: "tag_stores" })
  stores: Store[];
}
