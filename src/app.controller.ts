import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import * as argon2 from "argon2";
import { Household } from './household/household.entity';
import { Storage } from './storage/storage.entity';
import { Unit } from './unit/unit.entity';
import { Category } from './category/category.entity';
import { Item } from './item/item.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @InjectRepository(User) private userRep: Repository<User>,
    @InjectRepository(Household) private householdRep: Repository<Household>,
    @InjectRepository(Storage) private storageRep: Repository<Storage>,
    @InjectRepository(Unit) private unitRep: Repository<Unit>,
    @InjectRepository(Category) private categoryRep: Repository<Category>,
    @InjectRepository(Item) private itemRep: Repository<Item>) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('load')
  async loadDbData(): Promise<string> {
    // console.log(await argon2.hash("halloDiesIstMeinPasswort"));
    // console.log(await argon2.verify(await argon2.hash("halloDiesIstMeinPasswort"), "halloDiesIstMeinPasswort"));
    // console.log(await argon2.hash("asdf"));

    const user1 = this.userRep.create({ displayName: "Moritz", email: "mrief@gmail.com", password: await argon2.hash("asdf") });
    const user2 = this.userRep.create({ displayName: "Lukas", email: "lfschreiber@gmail.com", password: await argon2.hash("asdf") });
    const user3 = this.userRep.create({ displayName: "Emil", email: "eweber@gmail.com", password: await argon2.hash("asdf") });

    const users = await this.userRep.save([user1, user2, user3]);

    const household1 = this.householdRep.create({ name: "Home", emoji: "🏠", admin: users[0], users: [users[1]] });
    const household2 = this.householdRep.create({ name: "Girlfriend's Place", emoji: "❤️", admin: users[0] });
    const household3 = this.householdRep.create({ name: "Home Sweet Home", emoji: "🍯", admin: users[2], users: [users[0], users[1]] });

    const households = await this.householdRep.save([household1, household2, household3]);

    const storage1 = this.storageRep.create({ name: "Home Fridge", emoji: "❄️", household: household1 });
    const storage2 = this.storageRep.create({ name: "Home Cupboard", emoji: "🔥", household: household1 });

    const storage3 = this.storageRep.create({ name: "Girl Fridge", emoji: "❄️", household: household2 });
    const storage4 = this.storageRep.create({ name: "Girl Cupboard", emoji: "🔥", household: household2 });

    const storage5 = this.storageRep.create({ name: "HSH Fridge", emoji: "❄️", household_id: households[2].id });
    const storage6 = this.storageRep.create({ name: "HSH Cupboard", emoji: "🔥", household_id: households[2].id });

    const storages = await this.storageRep.save([storage1, storage2, storage3, storage4, storage5, storage6]);

    const units = await this.unitRep.save([this.unitRep.create({ name: "Kilogram", shortname: "kg" }), this.unitRep.create({ name: "Piece", shortname: "pc" }), this.unitRep.create({ name: "Litre", shortname: "l" }), this.unitRep.create({ name: "Gram", shortname: "g" }), this.unitRep.create({ name: "Millilitre", shortname: "ml" })]);

    const categories = await this.categoryRep.save([this.categoryRep.create({ name: "Fruit" }), this.categoryRep.create({ name: "Vegetable" }), this.categoryRep.create({ name: "Meat" }), this.categoryRep.create({ name: "Fish" })]);

    const item1 = this.itemRep.create({ name: "Apple", category: categories[0], unit: units[0], standardUnitAmount: .5 });
    const item2 = this.itemRep.create({ name: "Banana", category: categories[0], unit: units[1], standardUnitAmount: 5 });
    const item3 = this.itemRep.create({ name: "Cucumber", category: categories[1], unit: units[1], standardUnitAmount: 1 });
    const item4 = this.itemRep.create({ name: "Chicken Breast", category: categories[2], unit: units[0], standardUnitAmount: .350 });

    const items = this.itemRep.save([item1, item2, item3, item4]);

    return "juhu";
  }
}
