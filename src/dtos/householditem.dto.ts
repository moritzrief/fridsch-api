import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";

export class HouseholdItemDto {

    readonly item_id: number;
    readonly household_id: number;
    readonly category: Category;
    readonly unit: Unit;
    readonly emoji: string;
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