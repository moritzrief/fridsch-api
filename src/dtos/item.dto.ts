import { Category } from "src/category/category.entity";
import { Household } from "src/household/household.entity";
import { Unit } from "src/unit/unit.entity";

export class ItemDto {

    readonly name: string;
    readonly standardUnitAmount: number;
    readonly unit: Unit;
    readonly category: Category;
    readonly createdBy: Household;
}