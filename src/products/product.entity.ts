import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Characteristic } from '../characteristics/characteristic.entity';
import { Option } from '../options/option.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  
  @ManyToMany(() => Characteristic)
  @JoinTable()
  characteristics: Characteristic[];

  @ManyToMany(() => Option)
  @JoinTable()
  options: Option[];
}
