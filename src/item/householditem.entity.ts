import { Category } from "src/category/category.entity";
import { Household } from "src/household/household.entity";
import { Unit } from "src/unit/unit.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity('householditem')
export class HouseholdItem {

    @PrimaryColumn()
    item_id: number;

    @ManyToOne(type => Item)
    @JoinColumn({ name: "item_id" })
    item: Item;

    @PrimaryColumn()
    household_id: number;

    @ManyToOne(type => Household)
    @JoinColumn({ name: "household_id" })
    household: Household;

    @ManyToOne(type => Category)
    category: Category;

    @ManyToOne(type => Unit)
    unit: Unit;

    @Column({ name: "standard_unit_amount" })
    standardUnitAmount: number;
}

// +--------------------+---------+------+-----+---------+-------+
// | Field              | Type    | Null | Key | Default | Extra |
// +--------------------+---------+------+-----+---------+-------+
// | STANDARDUNITAMOUNT | double  | YES  |     | NULL    |       |
// | ITEM_ID            | int(11) | NO   | PRI | NULL    |       |
// | CATEGORY_ID        | int(11) | YES  | MUL | NULL    |       |
// | UNIT_ID            | int(11) | YES  | MUL | NULL    |       |
// | HOUSEHOLD_ID       | int(11) | NO   | PRI | NULL    |       |
// +--------------------+---------+------+-----+---------+-------+