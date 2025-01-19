import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepo.find({
        relations: ['subcategories', 'parent'], // Загружаем parent
    });

    // Оставляем только корневые категории
    return categories.filter(category => category.parent === null);
  }

  async create(data: Partial<Category>): Promise<Category> {
    const category = new Category();
    category.name = data.name;
    category.slug = data.slug;

    if (data.parent && typeof data.parent === 'number') {
        const parentCategory = await this.categoryRepo.findOne({ where: { id: Number(data.parent) } });
        if (parentCategory) {
            category.parent = parentCategory;
        }
    }

    return this.categoryRepo.save(category);
  }
}
