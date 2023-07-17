import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { HouseholdModule } from 'src/household/household.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), HouseholdModule],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryModule],
  controllers: [CategoryController],
})
export class CategoryModule { }
