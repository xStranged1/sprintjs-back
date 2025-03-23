import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Sprint } from "./Sprint"
import { Distance } from "./Distance"
import { User } from "./User"

@Entity()
export class PersonalRecord {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Distance, (distance) => distance.personalRecords)
    distance: Distance

    @ManyToOne(() => User, (user) => user.personalRecords)
    user: User

    @OneToOne(() => Sprint, { onDelete: 'CASCADE' })
    @JoinColumn()
    sprint: Sprint
}
