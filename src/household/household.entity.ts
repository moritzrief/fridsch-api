import { Category } from 'src/category/category.entity';
import { Storage } from 'src/storage/storage.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('household')
export class Household {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    name: string;

    @Column({ length: 32 })
    emoji: string;

    @ManyToOne(type => User, user => user.createdHouseholds)
    @JoinColumn({ name: "admin" })
    admin: User;

    @ManyToMany(type => User, user => user.households)
    @JoinTable({ name: "householduser" })
    users: User[];

    @OneToMany(type => Storage, storage => storage.household_id)
    storages: Storage[];

    @OneToMany(type => Category, category => category.createdBy)
    createdCategories: Category[];
}

// +---------+-------------+------+-----+---------+----------------+
// | Field   | Type        | Null | Key | Default | Extra          |
// +---------+-------------+------+-----+---------+----------------+
// | ID      | int(11)     | NO   | PRI | NULL    | auto_increment |
// | NAME    | varchar(32) | NO   |     | NULL    |                |
// | USER_ID | int(11)     | NO   | MUL | NULL    |                |
// +---------+-------------+------+-----+---------+----------------+