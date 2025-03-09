import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Circuit } from "./Circuit"

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

    @Column({ nullable: true })
    numberOfLaps: number

    @Column({ nullable: true })
    comment: string

    @Column({ nullable: true })
    effort: number

    @Column({ nullable: true })
    temperature: number

    @Column()
    takeBreak: boolean

    @Column()
    date: Date

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date

    @OneToOne(() => Circuit, { nullable: true })
    @JoinColumn()
    circuit: Circuit
}
