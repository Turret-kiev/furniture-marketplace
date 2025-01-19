import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Characteristic } from '../characteristics/characteristic.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string; // Фото привязанное к опции

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceModifier: number; // Доплата за опцию

  @ManyToOne(() => Characteristic, (characteristic) => characteristic.options, { nullable: false })
  characteristic: Characteristic;
}