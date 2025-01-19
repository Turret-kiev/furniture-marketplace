import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { Option } from './option.entity';
import { Characteristic } from '../characteristics/characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Characteristic])],
  providers: [OptionsService],
  controllers: [OptionsController],
  exports: [TypeOrmModule],
})
export class OptionsModule {}