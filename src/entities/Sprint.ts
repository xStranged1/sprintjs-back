import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Sprint {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    distance: number // distance in meters

    @Column()
    time: number // time in seconds

    @Column({ type: 'date' })
    date: Date // time in seconds

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date

}
