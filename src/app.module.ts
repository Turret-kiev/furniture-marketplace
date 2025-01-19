import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'market_admin',
      password: 'Daniil28092015Daniil',
      database: 'marketplace',
      autoLoadEntities: true,
      synchronize: true, // Только для разработки!
    }),
    CategoriesModule,
    ProductsModule,
    CharacteristicsModule,
    OptionsModule,
  ],
})
export class AppModule {}
