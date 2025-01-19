import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';
import { Characteristic } from '../characteristics/characteristic.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Category, (category) => category.subcategories, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  subcategories: Category[];
  
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
  
  @OneToMany(() => Characteristic, (characteristic) => characteristic.category)
  characteristics: Characteristic[];
}
