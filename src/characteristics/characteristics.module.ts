import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { Characteristic } from './characteristic.entity';
import { Category } from '../categories/category.entity';
import { Option } from '../options/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristic, Category, Option])],
  providers: [CharacteristicsService],
  controllers: [CharacteristicsController],
  exports: [TypeOrmModule],
})
export class CharacteristicsModule {}
