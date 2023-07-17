import { Household } from "src/household/household.entity";
import { StorageItem } from "src/item/storageitem.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('storage')
export class Storage {

    @PrimaryColumn()
    household_id: number;

    @ManyToOne(type => Household)
    @JoinColumn({ name: 'household_id' })
    household: Household;

    @PrimaryColumn()
    name: string;

    @Column({ length: 32 })
    emoji: string;

    @OneToMany(type => StorageItem, storageItem => storageItem.storage)
    stored_items: StorageItem[];

    // public numberOfItems(): number {

    //     //ToDo: get number of items

    // }
}