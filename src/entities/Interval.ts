import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sprint } from "./Sprint";

@Entity()
export class Interval {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'float' })
    distance: number

    @Column()
    time: number // time in seconds

    @Column({ default: false })
    startWithRest: boolean

    @Column()
    timeRest: number // time in seconds

    @Column()
    pace: number // seconds per km

    @Column({ nullable: true })
    effort: number

    @Column({ nullable: true })
    numberOfLaps: number

    @Column()
    numberOfRep: number

    @Column()
    order: number

    @ManyToOne(() => Sprint, (sprint) => sprint.intervals, { onDelete: "CASCADE" })
    sprint: Sprint
}