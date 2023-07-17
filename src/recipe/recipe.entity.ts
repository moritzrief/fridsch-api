import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";
import { Household } from "src/household/household.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "src/item/item.entity";

@Entity('recipe')
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    name: string;

    @ManyToMany(type => Item, { eager: true })
    @JoinTable({ name: "recipeitem" })
    ingredients: Item[]
}