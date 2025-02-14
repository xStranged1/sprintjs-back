import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Sprint {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    distance: number // distance in meters

    @Column()
    time: number // time in seconds

    @Column()
    pace: number // seconds per km

    @Column()
    takeBreak: boolean

    @Column()
    date: Date

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date

}
