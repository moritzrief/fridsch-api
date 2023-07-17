import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { Item } from "./item.entity";
import { Storage } from "../storage/storage.entity"
import { Household } from "src/household/household.entity";

@Entity('storageitem')
export class StorageItem {

    @PrimaryColumn()
    item_id: number;

    @ManyToOne(type => Item, { eager: true })
    @JoinColumn({ name: "item_id" })
    item: Item;

    @PrimaryColumn()
    household_id: number;

    @PrimaryColumn()
    storage_name: string;

    @ManyToOne(type => Storage)
    @JoinColumn([{ name: "household_id", referencedColumnName: "household_id" }, { name: "storage_name", referencedColumnName: "name" }])
    storage: Storage;

    @Column()
    quantity: number;

    @PrimaryColumn({
        type: 'timestamp',
        default: () => 'NOW()',
    })
    created_at: Date;

    @Column({type: 'timestamp', nullable: true})
    removed_at: Date;

    @ManyToOne(type => Unit, { eager: true })
    unit: Unit;

    @ManyToOne(type => Category, { eager: true })
    category: Category;
}

// +--------------------+-------------+------+-----+---------+-------+
// | Field              | Type        | Null | Key | Default | Extra |
// +--------------------+-------------+------+-----+---------+-------+
// | QUANTITY           | double      | NO   |     | NULL    |       |
// | DATEFROM           | date        | NO   |     | NULL    |       |
// | DATEUNTIL          | date        | YES  |     | NULL    |       |
// | ITEM_ID            | int(11)     | NO   | PRI | NULL    |       |
// | STANDARDUNITAMOUNT | double      | YES  |     | NULL    |       |
// | UNIT_ID            | int(11)     | YES  | MUL | NULL    |       |
// | CATEGORY_ID        | int(11)     | YES  | MUL | NULL    |       |
// | HOUSEHOLD_ID       | int(11)     | NO   | PRI | NULL    |       |
// | STORAGE_NAME       | varchar(64) | NO   | PRI | NULL    |       |
// +--------------------+-------------+------+-----+---------+-------+