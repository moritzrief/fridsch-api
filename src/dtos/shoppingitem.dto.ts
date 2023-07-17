import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";

export class ShoppingItemDto {

    readonly item_id: number;
    readonly household_id: number;
    readonly fridge_name: string;
    readonly quantity: number;
    readonly unit: Unit;
}