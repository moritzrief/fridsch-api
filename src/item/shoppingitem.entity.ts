import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { Item } from "./item.entity";
import { Storage } from "../storage/storage.entity"
import { Household } from "src/household/household.entity";
import { ShoppingList } from "src/shoppinglist/shopping.entity";

@Entity('shoppinglistitem')
export class ShoppingListItem {

    @PrimaryColumn()
    item_id: number;

    @ManyToOne(type => Item, { eager: true })
    @JoinColumn({ name: "item_id" })
    item: Item;

    @PrimaryColumn()
    household_id: number;

    @PrimaryColumn()
    fridge_name: string;

    @ManyToOne(type => ShoppingList)
    @JoinColumn([{ name: "household_id", referencedColumnName: "household_id" }, { name: "fridge_name", referencedColumnName: "name" }])
    fridge: ShoppingList;

    @Column()
    quantity: number;

    @Column({ default: false })
    isDone: boolean;

    @ManyToOne(type => Unit, { eager: true })
    unit: Unit;
}