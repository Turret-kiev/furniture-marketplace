import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { Characteristic } from '../characteristics/characteristic.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepo: Repository<Option>,
    @InjectRepository(Characteristic)
    private readonly characteristicRepo: Repository<Characteristic>,
  ) {}

  async getAll(): Promise<Option[]> {
    return this.optionRepo.find({ relations: ['characteristic'] });
  }

  async create(data: Partial<Option>): Promise<Option> {
    if (!data.characteristic || !data.characteristic.id) {
        throw new Error('Характеристика не указана');
    }

    const characteristic = await this.characteristicRepo.findOne({ where: { id: data.characteristic.id } });

    if (!characteristic) {
        throw new Error('Характеристика не найдена');
    }

    const option = this.optionRepo.create({
        name: data.name,
        image: data.image || null,
        priceModifier: data.priceModifier || 0,
        characteristic: characteristic,
    });

    return this.optionRepo.save(option);
  }
}
