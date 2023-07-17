import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdModule } from './household/household.module';
import { Household } from './household/household.entity';
import { StorageModule } from './storage/storage.module';
import { Storage } from './storage/storage.entity';
import { Category } from './category/category.entity';
import { Unit } from './unit/unit.entity';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.entity';
import { StorageItem } from './item/storageitem.entity';
import { HouseholdItem } from './item/householditem.entity';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shoppinglist/shopping.module';
import { ShoppingListItem } from './item/shoppingitem.entity';
import { ShoppingList } from './shoppinglist/shopping.entity';
import { RecipeModule } from './recipe/recipe.module';
import { Recipe } from './recipe/recipe.entity';


const db = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const pwd = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: host,
    port: +port,
    username: user,
    password: pwd,
    database: db,
    charset: "utf8mb4_unicode_ci",
    entities: [User, Household, Storage, Category, Unit, Item, StorageItem, HouseholdItem, ShoppingListItem, ShoppingList, Recipe],
    synchronize: true,
  }), UserModule, HouseholdModule, StorageModule, ItemModule, CategoryModule, UnitModule, AuthModule, ShoppingListModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
