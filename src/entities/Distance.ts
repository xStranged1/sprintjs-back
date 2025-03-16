import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { PersonalRecord } from "./PersonalRecord"

@Entity()
export class Distance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    distance: number

    @Column({ nullable: true })
    description: string

    @OneToMany(() => PersonalRecord, (pr) => pr.distance, { nullable: true })
    personalRecords: PersonalRecord[]
}
