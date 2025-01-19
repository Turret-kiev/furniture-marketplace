import { Controller, Get, Post, Body } from '@nestjs/common';
import { OptionsService } from './options.service';
import { Option } from './option.entity';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get()
  getAll(): Promise<Option[]> {
    return this.optionsService.getAll();
  }

  @Post()
  create(@Body() data: Partial<Option>): Promise<Option> {
    return this.optionsService.create(data);
  }
}
