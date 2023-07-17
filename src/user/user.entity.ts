import { Household } from 'src/household/household.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ nullable: true, unique: true })
    google_id: string;

    @Column({ length: 128 })
    displayName: string;

    @Column({ length: 128, unique: true })
    email: string;

    @Column({ select: false, nullable: true })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Household, household => household.admin)
    createdHouseholds: Household[];

    @ManyToMany(type => Household, household => household.users, {eager: true})
    households: Household[];
}