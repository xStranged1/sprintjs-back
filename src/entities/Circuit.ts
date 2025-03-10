import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Sprint } from "./Sprint"

@Entity()
export class Circuit {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'float' })
    distance: number

    @OneToMany(() => Sprint, (sprint) => sprint.circuit)
    sprints: Sprint[]
}
