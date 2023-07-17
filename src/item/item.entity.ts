import { Category } from "src/category/category.entity";
import { Unit } from "src/unit/unit.entity";
import { Household } from "src/household/household.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('item')
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    name: string;

    @ManyToOne(type => Unit, { eager: true })
    unit: Unit;

    // Describes how much of a unit a container typically has => for milk it might be 1 if the unit is litre; or 1000 if the unit is ml
    @Column({ name: "standard_unit_amount" })
    standardUnitAmount: number;

    @ManyToOne(type => Category, { eager: true })
    category: Category;

    @ManyToOne(type => Household, { nullable: true })
    createdBy: Household;
}

// +--------------+--------------+------+-----+---------+----------------+
// | Field        | Type         | Null | Key | Default | Extra          |
// +--------------+--------------+------+-----+---------+----------------+
// | ID           | int(11)      | NO   | PRI | NULL    | auto_increment |
// | NAME         | varchar(128) | NO   |     | NULL    |                |
// | UNIT_ID      | int(11)      | NO   | MUL | NULL    |                |
// | CATEGORY_ID  | int(11)      | NO   | MUL | NULL    |                |
// | HOUSEHOLD_ID | int(11)      | YES  | MUL | NULL    |                |
// +--------------+--------------+------+-----+---------+----------------+