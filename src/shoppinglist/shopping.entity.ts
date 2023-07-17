import { Household } from "src/household/household.entity";
import { ShoppingListItem } from "src/item/shoppingitem.entity";
import { StorageItem } from "src/item/storageitem.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('shoppinglist')
export class ShoppingList {

    @PrimaryColumn()
    household_id: number;

    @ManyToOne(type => Household)
    @JoinColumn({ name: 'household_id' })
    household: Household;

    @PrimaryColumn()
    name: string;

    @Column({ length: 32 })
    emoji: string;

    @OneToMany(type => ShoppingListItem, fridgeitem => fridgeitem.fridge)
    items: ShoppingListItem[];

    // public numberOfItems(): number {

    //     //ToDo: get number of items

    // }
}