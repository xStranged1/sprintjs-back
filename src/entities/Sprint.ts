import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Circuit } from "./Circuit"
import { User } from "./User"
import { Interval } from "./Interval"

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

    @OneToMany(() => Interval, (interval) => interval.sprint, { cascade: true })
    intervals: Interval[]

    @ManyToOne(() => User, (user) => user.sprints)
    user: User

    @ManyToOne(() => Circuit, (circuit) => circuit.sprints, { nullable: true })
    circuit: Circuit | null

}
