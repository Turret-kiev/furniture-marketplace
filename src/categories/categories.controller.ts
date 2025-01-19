import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Category>): Promise<Category> {
    return this.categoriesService.create(data);
  }
}
