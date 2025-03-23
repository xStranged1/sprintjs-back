import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Sprint } from "./Sprint"
import { Circuit } from "./Circuit"
import { PersonalRecord } from "./PersonalRecord"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    sub: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => Circuit, (circuit) => circuit.user)
    circuits: Circuit[]

    @OneToMany(() => Sprint, (sprint) => sprint.user)
    sprints: Sprint[]

    @OneToMany(() => PersonalRecord, (pr) => pr.user)
    personalRecords: PersonalRecord[]
}
