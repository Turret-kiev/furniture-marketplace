import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Option } from '../options/option.entity';

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isRequired: boolean;

  @ManyToOne(() => Category, (category) => category.characteristics, { nullable: false })
  category: Category;

  @OneToMany(() => Option, (option) => option.characteristic)
  options: Option[];
}