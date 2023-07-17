import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('unit')
export class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    name: string;

    @Column({ length: 4 })
    shortname: string;
}

// +-----------+-------------+------+-----+---------+----------------+
// | Field     | Type        | Null | Key | Default | Extra          |
// +-----------+-------------+------+-----+---------+----------------+
// | ID        | int(11)     | NO   | PRI | NULL    | auto_increment |
// | NAME      | varchar(64) | NO   |     | NULL    |                |
// | SHORTNAME | varchar(4)  | NO   |     | NULL    |                |
// +-----------+-------------+------+-----+---------+----------------+