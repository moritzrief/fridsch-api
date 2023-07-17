import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageDto } from 'src/dtos/storage.dto';
import { ItemService } from 'src/item/item.service';
import { ShoppingListItem } from 'src/item/shoppingitem.entity';
import { StorageItem } from 'src/item/storageitem.entity';
import { Repository } from 'typeorm';
import { ShoppingList } from './shopping.entity';

@Injectable()
export class ShoppingListService {

    constructor(@InjectRepository(ShoppingList) private shoppingRepository: Repository<ShoppingList>,
        @InjectRepository(ShoppingListItem) private shoppingItemRepository: Repository<ShoppingListItem>,
        private itemService: ItemService) { }

    findAll(household_id: number): Promise<ShoppingList[]> {
        return this.shoppingRepository.findBy({ household_id });
    }

    create(shoppingListDto: StorageDto): Promise<ShoppingList> {
        const shoppingList = this.shoppingRepository.create(shoppingListDto);
        return this.shoppingRepository.save(shoppingList);
    }

    async getNumberofItems(shoppingName: string, householdId: number): Promise<number> {
        const res = await this.shoppingItemRepository.createQueryBuilder('si')
            .innerJoin('shoppinglist', 's', 'si.fridge_name = s.name AND si.household_id = s.household_id')
            .where('s.name = :name', { name: shoppingName })
            .andWhere('s.household_id  = :id', { id: householdId })
            .getMany();
        return res.length;
    }

    async finishShopping(name: string, household_id: number, storage: string): Promise<any> {
        const items = await this.shoppingItemRepository.findBy({ fridge_name: name, household_id, isDone: true });
        items.forEach(i => this.shoppingItemRepository.delete(i));
        return this.itemService.createStorageItems(items, storage);
    }
}
