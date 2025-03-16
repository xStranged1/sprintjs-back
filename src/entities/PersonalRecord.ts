import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Sprint } from "./Sprint"
import { Distance } from "./Distance"

@Entity()
export class PersonalRecord {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Distance, (distance) => distance.personalRecords)
    distance: Distance

    @OneToOne(() => Sprint)
    @JoinColumn()
    sprint: Sprint
}
