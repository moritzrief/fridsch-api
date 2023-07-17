import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseholdItemDto } from 'src/dtos/householditem.dto';
import { ItemDto } from 'src/dtos/item.dto';
import { ShoppingItemDto } from 'src/dtos/shoppingitem.dto';
import { StorageItemDto } from 'src/dtos/storageitem.dto';
import { ILike, IsNull, Like, Repository } from 'typeorm';
import { HouseholdItem } from './householditem.entity';
import { Item } from './item.entity';
import { ShoppingListItem } from './shoppingitem.entity';
import { StorageItem } from './storageitem.entity';

@Injectable()
export class ItemService {

    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>,
        @InjectRepository(StorageItem) private storageItemRepository: Repository<StorageItem>,
        @InjectRepository(HouseholdItem) private householdItemRepository: Repository<HouseholdItem>,
        @InjectRepository(ShoppingListItem) private shoppingItemRepository: Repository<ShoppingListItem>) { }

    deleteShoppingItem(item_id: number, name: string, id: number): any {
        return this.shoppingItemRepository.delete({ fridge_name: name, item_id, household_id: id });
    }

    createShoppingItem(sItemDTO: ShoppingItemDto): Promise<ShoppingListItem> {
        Logger.log(sItemDTO);
        const newItem = this.shoppingItemRepository.create(sItemDTO);
        Logger.log({ ...newItem });
        return this.shoppingItemRepository.save(newItem);
    }
    async findAllShoppingItems(name: string, id: number): Promise<ShoppingListItem[]> {
        const items = await this.shoppingItemRepository.findBy({ fridge_name: name, household_id: id });

        console.log(items);

        items.forEach(item => {

            if (item.unit === undefined || item.unit == null) {
                item.unit = item.item.unit;
            }
            item.item.unit = undefined;
            item.item.category = undefined;
        });

        console.log(items);

        return items;
    }

    async changeStatus(item_id: number, name: string, id: number, status: boolean): Promise<ShoppingListItem> {
        return this.shoppingItemRepository.save({ fridge_name: name, household_id: id, item_id, isDone: status });
    }

    createItem(newItem: ItemDto): Promise<Item> {
        const item = this.itemRepository.create(newItem);
        return this.itemRepository.save(item);
    }

    findAllItems(household_id: number): Promise<Item[]> {
        return this.itemRepository.find({
            where: [
                { createdBy: { id: household_id } },
                { createdBy: IsNull() },
            ]
        });
    }

    filterAllItems(household_id: number, filter: string): Promise<Item[]> {
        return this.itemRepository.findBy([
            { name: ILike(`%${filter}%`), createdBy: { id: household_id } },
            { name: ILike(`%${filter}%`), createdBy: IsNull() },
        ]);
    }

    async getAllStorageItems(storage_name: string, household_id: number): Promise<StorageItem[]> {
        //where datuntil < als jz
        const items: StorageItem[] = await this.storageItemRepository.findBy({ storage_name: storage_name, household_id: household_id, removed_at: IsNull() });

        console.log(items);


        items.forEach(item => {

            if (item.unit === undefined || item.unit == null) {
                item.unit = item.item.unit;
            }
            if (item.category === undefined || item.category == null) {
                item.category = item.item.category;
            }
            item.item.unit = undefined;
            item.item.category = undefined;
        });

        console.log(items);

        return items;
    }

    filterStorageItems(storage_name: string, household_id: number, filter: string): Promise<StorageItem[]> {
        //Todo filtern nach unit category dates usw.
        return this.storageItemRepository.findBy({ storage_name: storage_name, household_id: household_id, item: { name: ILike(`%${filter}%`) } });
    }

    createStorageItem(item: StorageItemDto): Promise<StorageItem> {
        const newItem = this.storageItemRepository.create(item);
        newItem.created_at = new Date();
        return this.storageItemRepository.save(newItem);
    }

    async createStorageItems(items: ShoppingListItem[], storage: string): Promise<StorageItem[]> {
        const newItems = this.storageItemRepository.create(items);
        newItems.forEach(i => { i.created_at = new Date(); i.storage_name = storage; });
        return this.storageItemRepository.save(newItems);
    }

    async deleteStorageItem(item_id: number, name: string, id: number, created_at: Date): Promise<any> {
        //Logger.log(await this.storageItemRepository.findOneBy({ storage_name: name, item_id, household_id: id, created_at: created_at }));
        const possible_items = await this.storageItemRepository.findBy({ storage_name: name, item_id, household_id: id });
        possible_items.forEach(i => Logger.log(i.created_at.toISOString()))
        const item = possible_items.filter(i => i.created_at.toISOString() == created_at.toString().substring(0, 20) + '000Z')[0];
        Logger.log(created_at.toString().substring(0, 20) + '000Z')
        item.removed_at = new Date();
        return this.storageItemRepository.save(item);//, { removed_at: new Date().toISOString() });
    }

    createHouseholditem(item: HouseholdItemDto): Promise<HouseholdItem> {
        return this.householdItemRepository.save(item);
    }

    getAvgTimeInStorage(household_id: number): Promise<any> {
        //in seconds
        return this.storageItemRepository.createQueryBuilder('si')
            .select('si.item_id, AVG(TIMESTAMPDIFF(SECOND, si.created_at, si.removed_at)) AS avg_time')
            .where('si.household_id = :household_id', { household_id })
            .andWhere('si.removed_at IS NOT NULL')
            .groupBy('si.item_id')
            .getRawMany();
    }

    async getPossibleShoppingListItems(household_id: number, shopping_name: string): Promise<ShoppingListItem[]> {
        let items = await this.storageItemRepository.createQueryBuilder('si')
            .where('si.removed_at IS NULL')
            .andWhere('si.household_id = :household_id', { household_id })
            .andWhere('TIMESTAMPDIFF(SECOND, si.created_at, NOW()) > \
            (SELECT AVG(TIMESTAMPDIFF(SECOND, si2.created_at, si2.removed_at))\
            FROM storageitem si2 WHERE si2.household_id = :household_id AND si2.removed_at IS NOT NULL\
            GROUP BY si2.item_id\
            HAVING si2.item_id = si.item_id)')
            .getMany();
        for (const i of items) {
            i.unit = (await this.getUnitOfStorageitem(i)).unit;
        }
        Logger.log(items);
        let shopping_items = items.map(i => this.shoppingItemRepository.create({ fridge_name: shopping_name, household_id, item_id: i.item_id, unit: i.unit, quantity: i.quantity, isDone: false }));
        Logger.log(shopping_items);
        return shopping_items;
    }

    async getUnitOfStorageitem(item: StorageItem): Promise<StorageItem> {
        const i = (await this.storageItemRepository.findBy({ storage_name: item.storage_name, household_id: item.household_id, item_id: item.item_id, created_at: item.created_at }))[0];
        if (i.unit === undefined || i.unit == null) {
            i.unit = i.item.unit;
        }
        return i;
    }

}
