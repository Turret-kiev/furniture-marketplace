import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';
import { Characteristic } from '../characteristics/characteristic.entity';
import { Option } from '../options/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Characteristic, Option])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
