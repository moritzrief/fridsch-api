import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";

export class StorageItemDto {

    readonly item_id: number;
    readonly household_id: number;
    readonly storage_name: string;
    readonly quantity: number;
    readonly unit: Unit;
    readonly category: Category;
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