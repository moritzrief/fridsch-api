import { Household } from "src/household/household.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    name: string;

    @ManyToOne(type => Household, household => household.createdCategories, { nullable: true })
    createdBy: Household;
}

// +--------------+-------------+------+-----+---------+----------------+
// | Field        | Type        | Null | Key | Default | Extra          |
// +--------------+-------------+------+-----+---------+----------------+
// | ID           | int(11)     | NO   | PRI | NULL    | auto_increment |
// | NAME         | varchar(32) | NO   |     | NULL    |                |
// | HOUSEHOLD_ID | int(11)     | YES  | MUL | NULL    |                |
// +--------------+-------------+------+-----+---------+----------------+