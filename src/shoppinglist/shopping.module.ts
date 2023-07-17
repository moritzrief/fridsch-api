import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping.service';
import { ShoppingListController } from './shopping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from './shopping.entity';
import { HouseholdModule } from 'src/household/household.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList]), HouseholdModule, ItemModule],
  providers: [ShoppingListService],
  controllers: [ShoppingListController]
})
export class ShoppingListModule { }
