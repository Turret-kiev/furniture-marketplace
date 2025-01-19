import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from './characteristic.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicRepo: Repository<Characteristic>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Characteristic[]> {
    return this.characteristicRepo.find({ relations: ['category'] });
  }

  async create(data: Partial<Characteristic>): Promise<Characteristic> {
    if (!data.category || !data.category.id) {
        throw new Error('Категория не указана');
    }

    const category = await this.categoryRepo.findOne({ where: { id: data.category.id } });

    if (!category) {
        throw new Error('Категория не найдена');
    }

    const characteristic = this.characteristicRepo.create({
        name: data.name,
        isRequired: data.isRequired || false,
        category: category,
    });

    return this.characteristicRepo.save(characteristic);
  }
}