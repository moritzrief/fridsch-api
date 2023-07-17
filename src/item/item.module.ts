import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { StorageItemController } from './storageitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { HouseholdItem } from './householditem.entity';
import { StorageItem } from './storageitem.entity';
import { HouseholdService } from 'src/household/household.service';
import { HouseholdModule } from 'src/household/household.module';
import { ShoppingListItem } from './shoppingitem.entity';
import { ItemController } from './item.controller';
import { ShoppingItemController } from './shoppingitem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item, HouseholdItem, StorageItem, ShoppingListItem]), HouseholdModule],
  providers: [ItemService],
  controllers: [StorageItemController, ItemController, ShoppingItemController],
  exports: [TypeOrmModule, ItemModule, ItemService],
})
export class ItemModule { }
