import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { HouseholdModule } from 'src/household/household.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), HouseholdModule, ItemModule],
  providers: [RecipeService],
  controllers: [RecipeController]
})
export class RecipeModule { }
