import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';
import { Characteristic } from '../characteristics/characteristic.entity';
import { Option } from '../options/option.entity';
import { In } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Characteristic)
    private readonly characteristicRepo: Repository<Characteristic>,
    @InjectRepository(Option)
    private readonly optionRepo: Repository<Option>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepo.find({ 
        relations: ['category', 'characteristics', 'options'] 
    });
  }

  async create(data: Partial<Product>): Promise<Product> {
    const category = await this.categoryRepo.findOne({ where: { id: data.category.id } });

    if (!category) {
        throw new Error('Категория не найдена');
    }

    const characteristics = data.characteristics?.length
        ? await this.characteristicRepo.findBy({ id: In(data.characteristics.map(c => c.id)) })
        : [];

    const options = data.options?.length
        ? await this.optionRepo.findBy({ id: In(data.options.map(o => o.id)) })
        : [];

    const product = this.productRepo.create({
        name: data.name,
        slug: data.slug,
        price: data.price,
        description: data.description,
        category: category,
    });

    await this.productRepo.save(product);

    // Явно устанавливаем связи после сохранения
    product.characteristics = characteristics;
    product.options = options;

    return this.productRepo.save(product);
  }
}
