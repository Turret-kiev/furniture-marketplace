import { Controller, Get, Post, Body } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { Characteristic } from './characteristic.entity';

@Controller('characteristics') // <-- Должно быть именно 'characteristics'
export class CharacteristicsController {
  constructor(private readonly characteristicsService: CharacteristicsService) {}

  @Get()
  getAll(): Promise<Characteristic[]> {
    return this.characteristicsService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Characteristic>): Promise<Characteristic> {
    return this.characteristicsService.create(data);
  }
}
